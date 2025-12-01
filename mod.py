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

def undo_ssr_changes():
    """
    Reverts the project to Static Site Generation (SSG).
    Removes Vercel/Node adapters and Hono backend logic.
    """
    ops = FileOps()
    
    # Paths
    config_path = "astro.config.mjs"
    pkg_path = "package.json"

    # ---------------------------------------------------------
    # STEP 1: Revert package.json dependencies
    # ---------------------------------------------------------
    pkg_content = ops.read_file(pkg_path)
    if pkg_content:
        pkg_json = json.loads(pkg_content)
        deps = pkg_json.get("dependencies", {})
        
        # Remove SSR packages
        keys_to_remove = ["@astrojs/vercel", "@astrojs/node", "hono"]
        for key in keys_to_remove:
            if key in deps:
                del deps[key]
                print(f"[INFO]: Removed {key} from dependencies.")
            
        pkg_json["dependencies"] = deps
        ops.update_file(pkg_path, json.dumps(pkg_json, indent=2))
        print("[SUCCESS]: Reverted package.json to static dependencies")

    # ---------------------------------------------------------
    # STEP 2: Revert astro.config.mjs
    # ---------------------------------------------------------
    config_content = ops.read_file(config_path)
    if config_content:
        # Remove imports for adapters
        config_content = re.sub(r"import\s+node\s+from\s+['\"]@astrojs/node['\"];\n?", "", config_content)
        config_content = re.sub(r"import\s+vercel\s+from\s+['\"]@astrojs/vercel['\"];\n?", "", config_content)
        
        # Remove output: 'server' and adapter configuration
        # This regex looks for the object inside defineConfig and cleans it up
        # It's safer to just rewrite the config to a known static state if the regex is too complex/risky
        # or we can target specific lines.
        
        # Attempt to remove output: 'server'
        config_content = re.sub(r"\s*output:\s*['\"]server['\"],?", "", config_content)
        
        # Attempt to remove adapter calls
        config_content = re.sub(r"\s*adapter:\s*node\(\{.*?\}\),?", "", config_content, flags=re.DOTALL)
        config_content = re.sub(r"\s*adapter:\s*vercel\(\),?", "", config_content)
        
        # Clean up empty lines or trailing commas if needed (simple approach)
        
        ops.update_file(config_path, config_content)
        print("[SUCCESS]: Reverted astro.config.mjs to static configuration")

if __name__ == "__main__":
    undo_ssr_changes()