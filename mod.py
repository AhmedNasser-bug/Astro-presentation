import os
import sys

# STRICT DEPENDENCY: Relying on the existing file_ops module.
try:
    from file_ops import FileOps
except ImportError:
    print("[CRITICAL]: 'file_ops.py' not found. This script relies on the FileOps utility.")
    sys.exit(1)

def force_fix_hono_endpoint():
    """
    Forces the update of the Hono endpoint configuration using update_file
    to bypass the existence check that failed previously.
    """
    ops = FileOps()
    
    # Path to the Hono endpoint file
    hono_file_path = os.path.join("src", "pages", "api", "hono", "[...route].js")
    
    # The corrected Hono endpoint code with basePath
    corrected_hono_code = r"""
import { Hono } from 'hono';

// Initialize Hono with the correct base path relative to where this file lives in 'src/pages'
const app = new Hono().basePath('/api/hono');

app.get('/data', async (c) => {
  // Simulate database processing latency
  await new Promise(resolve => setTimeout(resolve, 800));

  return c.json({
    message: "Data fetched from Hono Router",
    timestamp: new Date().toISOString(),
    framework: "Hono",
    status: 200
  });
});

// Catch-all route to handle 404s within the Hono app context gracefully
app.all('*', (c) => {
    return c.json({ error: "Route not found in Hono app", path: c.req.path }, 404);
});

export const ALL = ({ request }) => app.fetch(request);
"""

    # Use update_file since the file exists
    if ops.update_file(hono_file_path, corrected_hono_code):
        print("[SUCCESS]: Forced update of src/pages/api/hono/[...route].js with correct basePath.")
    else:
        # Fallback: create if it somehow doesn't exist (race condition safety)
        if ops.create_file(hono_file_path, corrected_hono_code):
             print("[SUCCESS]: Created src/pages/api/hono/[...route].js")
        else:
             print("[ERROR]: Failed to write Hono endpoint file.")

if __name__ == "__main__":
    force_fix_hono_endpoint()