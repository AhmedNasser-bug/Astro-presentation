import os
import re
import sys
import json

# STRICT DEPENDENCY: Relying on the existing file_ops module.
try:
    from file_ops import FileOps
except ImportError:
    print("[CRITICAL]: 'file_ops.py' not found. This script relies on the FileOps utility.")
    sys.exit(1)

def cleanup_deployment():
    """
    Removes backend integration features and reverts to static configuration.
    """
    ops = FileOps()
    
    # Paths
    pkg_path = "package.json"
    config_path = "astro.config.mjs"
    index_path = os.path.join("src", "pages", "index.astro")
    
    # Files/Dirs to delete
    files_to_delete = [
        os.path.join("src", "components", "BackendReal.jsx"),
        os.path.join("src", "sections", "BackendRealSection.astro"),
        os.path.join("src", "pages", "api", "hono", "[...route].js"),
        os.path.join("src", "pages", "api", "native.js"),
    ]
    
    dirs_to_clean = [
        os.path.join("src", "pages", "api", "hono"),
        os.path.join("src", "pages", "api")
    ]

    # ---------------------------------------------------------
    # STEP 1: Remove Files
    # ---------------------------------------------------------
    print("--- Cleaning up files ---")
    for file_path in files_to_delete:
        if os.path.exists(file_path):
            if ops.delete_file(file_path):
                print(f"[REMOVED]: {file_path}")
        else:
            print(f"[INFO]: File already gone: {file_path}")

    # Clean directories
    for dir_path in dirs_to_clean:
        if os.path.exists(dir_path) and not os.listdir(dir_path):
            os.rmdir(dir_path)
            print(f"[CLEANED]: Removed empty directory {dir_path}")

    # ---------------------------------------------------------
    # STEP 2: Revert index.astro
    # ---------------------------------------------------------
    print("\n--- Cleaning up index.astro ---")
    content = ops.read_file(index_path)
    if content:
        # Remove Import
        content = re.sub(r"import\s+BackendRealSection\s+from\s+['\"].*?BackendRealSection\.astro['\"];\n?", "", content)
        # Remove Component
        content = re.sub(r"\s*<BackendRealSection\s*/>\n?", "", content)
        ops.update_file(index_path, content)
        print("[SUCCESS]: Removed BackendRealSection from index.astro")

    # ---------------------------------------------------------
    # STEP 3: Revert package.json (Remove SSR/Backend deps)
    # ---------------------------------------------------------
    print("\n--- Cleaning up package.json ---")
    pkg_content = ops.read_file(pkg_path)
    if pkg_content:
        pkg_json = json.loads(pkg_content)
        deps = pkg_json.get("dependencies", {})
        
        # Remove backend deps
        keys_to_remove = ["hono", "@astrojs/node", "@astrojs/vercel"]
        for key in keys_to_remove:
            if key in deps:
                del deps[key]
                print(f"[INFO]: Removed {key}")
        
        pkg_json["dependencies"] = deps
        ops.update_file(pkg_path, json.dumps(pkg_json, indent=2))
        print("[SUCCESS]: Reverted package.json")

    # ---------------------------------------------------------
    # STEP 4: Revert astro.config.mjs (Back to Static)
    # ---------------------------------------------------------
    print("\n--- Cleaning up astro.config.mjs ---")
    config_content = ops.read_file(config_path)
    if config_content:
        # Remove imports
        config_content = re.sub(r"import\s+(node|vercel)\s+from\s+['\"]@astrojs/(node|vercel)['\"];\n?", "", config_content)
        
        # Remove config options
        config_content = re.sub(r"\s*output:\s*['\"]server['\"],?", "", config_content)
        config_content = re.sub(r"\s*adapter:\s*(node\(\{.*?\}\)|vercel\(\)),?", "", config_content, flags=re.DOTALL)
        
        ops.update_file(config_path, config_content)
        print("[SUCCESS]: Reverted astro.config.mjs to static mode")

if __name__ == "__main__":
    cleanup_deployment()