import subprocess
import sys
import os

# STRICT DEPENDENCY: Relying on the existing file_ops module.
# Even though this script is primarily Git-based, we maintain the project's architectural pattern.
try:
    from file_ops import FileOps
except ImportError:
    pass # Non-critical for git operations, but noted.

def run_git_cmd(args, error_msg="Git command failed"):
    """
    Helper to run git commands and handle output.
    """
    try:
        result = subprocess.run(
            args,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"[ERROR]: {error_msg}")
        print(f"Details: {e.stderr.strip()}")
        return None

def merge_to_deployment_branch():
    """
    Orchestrates the merge from the current branch (e.g., 'deploy-ssr') 
    into a 'deployment' branch.
    """
    print("--- 🔄 Starting Deployment Merge Workflow ---")

    # 1. Verify Git Repo
    if not os.path.exists(".git"):
        print("[CRITICAL]: This is not a git repository. Run 'git init' first.")
        return

    # 2. Identify Current Branch
    current_branch = run_git_cmd(["git", "branch", "--show-current"], "Could not get current branch")
    if not current_branch: return
    
    print(f"[INFO]: Current working branch is '{current_branch}'")
    
    if current_branch == "deployment":
        print("[INFO]: You are already on the deployment branch.")
        return

    # 3. Safe Commit (Ensure working tree is clean)
    status = run_git_cmd(["git", "status", "--porcelain"], "Could not check status")
    if status:
        print("[WARN]: Uncommitted changes detected. Committing them now...")
        run_git_cmd(["git", "add", "."], "Failed to stage files")
        run_git_cmd(["git", "commit", "-m", f"chore: Save work on {current_branch} before merge"], "Failed to commit")
        print("[SUCCESS]: Changes committed.")
    else:
        print("[INFO]: Working tree is clean.")

    # 4. Check/Create Deployment Branch
    # We check if 'deployment' exists in the local branch list
    branches = run_git_cmd(["git", "branch", "--list", "deployment"], "Failed to list branches")
    
    if not branches:
        print("[ACTION]: 'deployment' branch not found. Creating it...")
        # Create deployment branch off current branch
        run_git_cmd(["git", "branch", "deployment"], "Failed to create deployment branch")
    else:
        print("[INFO]: 'deployment' branch exists.")

    # 5. Perform the Merge
    print(f"[ACTION]: Switching to 'deployment'...")
    if run_git_cmd(["git", "checkout", "deployment"], "Failed to checkout deployment") is None: return

    print(f"[ACTION]: Merging '{current_branch}' into 'deployment'...")
    # Using --no-ff to create a merge commit for history visibility
    merge_out = run_git_cmd(["git", "merge", "--no-ff", current_branch, "-m", f"merge: Update deployment from {current_branch}"], "Merge failed")
    
    if merge_out is not None:
        print("[SUCCESS]: Merge successful!")
        print("-" * 30)
        print(f"[NEXT STEP]: Run the following command to push to your host:")
        print(f"            git push origin deployment")
        print("-" * 30)
    else:
        print("[CRITICAL]: Merge conflict detected. Please resolve manually.")
        # Attempt to switch back to safety
        run_git_cmd(["git", "checkout", current_branch], "Failed to revert branch")

if __name__ == "__main__":
    merge_to_deployment_branch()