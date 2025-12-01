import os
import shutil

class FileOps:
    """
    A utility class for performing CRUD operations on files and their contents.
    Provides methods for creating, reading, updating, and deleting files,
    as well as managing file content with safety checks.
    """

    def __init__(self, base_dir="."):
        """
        Initialize the FileOps utility with a base directory.
        Defaults to the current working directory.
        """
        self.base_dir = base_dir

    def _resolve_path(self, filepath):
        """
        Internal helper to resolve the full path of a file.
        Ensures paths are relative to the base directory.
        """
        return os.path.join(self.base_dir, filepath)

    def create_file(self, filepath, content=""):
        """
        Create a new file with optional initial content.
        If the file already exists, it will NOT be overwritten unless force is applied (not implemented here for safety).
        Returns True if successful, False if file exists or error occurs.
        """
        full_path = self._resolve_path(filepath)
        if os.path.exists(full_path):
            print(f"[WARNING]: File '{filepath}' already exists. Use update_file to modify content.")
            return False
        
        try:
            # Ensure the directory structure exists
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[SUCCESS]: Created file '{filepath}'")
            return True
        except Exception as e:
            print(f"[ERROR]: Failed to create file '{filepath}'. Reason: {e}")
            return False

    def read_file(self, filepath):
        """
        Read the content of a file.
        Returns the content string if successful, None if file not found or error occurs.
        """
        full_path = self._resolve_path(filepath)
        if not os.path.exists(full_path):
            print(f"[ERROR]: File '{filepath}' not found.")
            return None
        
        try:
            with open(full_path, 'r', encoding='utf-8') as f:
                return f.read()
        except Exception as e:
            print(f"[ERROR]: Failed to read file '{filepath}'. Reason: {e}")
            return None

    def update_file(self, filepath, content, mode='w'):
        """
        Update the content of an existing file.
        mode='w' (default): Overwrite existing content.
        mode='a': Append to existing content.
        Returns True if successful, False if file not found or error occurs.
        """
        full_path = self._resolve_path(filepath)
        if not os.path.exists(full_path):
            print(f"[ERROR]: File '{filepath}' not found. Use create_file to create it.")
            return False
        
        try:
            with open(full_path, mode, encoding='utf-8') as f:
                f.write(content)
            print(f"[SUCCESS]: Updated file '{filepath}' (mode='{mode}')")
            return True
        except Exception as e:
            print(f"[ERROR]: Failed to update file '{filepath}'. Reason: {e}")
            return False

    def delete_file(self, filepath):
        """
        Delete a file.
        Returns True if successful, False if file not found or error occurs.
        """
        full_path = self._resolve_path(filepath)
        if not os.path.exists(full_path):
            print(f"[ERROR]: File '{filepath}' not found.")
            return False
        
        try:
            os.remove(full_path)
            print(f"[SUCCESS]: Deleted file '{filepath}'")
            return True
        except Exception as e:
            print(f"[ERROR]: Failed to delete file '{filepath}'. Reason: {e}")
            return False

    def replace_in_file(self, filepath, old_string, new_string):
        """
        Replace occurrences of a string within a file.
        Returns True if successful, False otherwise.
        """
        content = self.read_file(filepath)
        if content is None:
            return False
        
        new_content = content.replace(old_string, new_string)
        if content == new_content:
            print(f"[INFO]: No occurrences of '{old_string}' found in '{filepath}'.")
            return True # Not an error, just no change
        
        return self.update_file(filepath, new_content)

# Example Usage (commented out to prevent execution on import)
if __name__ == "__main__":
    ops = FileOps()
    
    # Create
    ops.create_file("test_crud.txt", "Initial content.\n")
    
    # Read
    print(f"Content: {ops.read_file('test_crud.txt')}")
    
    # Update (Append)
    ops.update_file("test_crud.txt", "Appended line.\n", mode='a')
    
    # Replace
    ops.replace_in_file("test_crud.txt", "Initial", "Updated")
    
    # Verify Update
    print(f"Updated Content: {ops.read_file('test_crud.txt')}")
    
    # Delete
    ops.delete_file("test_crud.txt")