import json
import os
import tkinter as tk
from tkinter import messagebox, ttk

# Set paths relative to this script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# src/App/scripts -> src/App/sponsors.json
JSON_PATH = os.path.join(SCRIPT_DIR, '..', 'sponsors.json')
# src/App/scripts -> public/assets/Sponsors
ASSETS_DIR = os.path.join(SCRIPT_DIR, '..', '..', '..', 'public', 'assets', 'Sponsors')

class SponsorApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Manage Sponsors")
        self.geometry("600x400")

        self.sponsors = []
        self.logos = []
        self.load_data()

        # UI Layout
        # Left Side - List
        self.list_frame = ttk.Frame(self)
        self.list_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        ttk.Label(self.list_frame, text="Sponsors").pack(anchor=tk.W)
        self.listbox = tk.Listbox(self.list_frame)
        self.listbox.pack(fill=tk.BOTH, expand=True)
        self.listbox.bind("<<ListboxSelect>>", self.on_select)
        
        btn_frame = ttk.Frame(self.list_frame)
        btn_frame.pack(fill=tk.X, pady=5)
        ttk.Button(btn_frame, text="Add New", command=self.clear_form).pack(side=tk.LEFT, expand=True, fill=tk.X, padx=2)
        ttk.Button(btn_frame, text="Delete", command=self.delete_sponsor).pack(side=tk.LEFT, expand=True, fill=tk.X, padx=2)

        # Right Side - Form
        self.form_frame = ttk.Frame(self)
        self.form_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        ttk.Label(self.form_frame, text="Name").pack(anchor=tk.W)
        self.entry_name = ttk.Entry(self.form_frame)
        self.entry_name.pack(fill=tk.X, pady=(0, 10))

        ttk.Label(self.form_frame, text="URL").pack(anchor=tk.W)
        self.entry_url = ttk.Entry(self.form_frame)
        self.entry_url.pack(fill=tk.X, pady=(0, 10))

        ttk.Label(self.form_frame, text="Logo").pack(anchor=tk.W)
        self.combo_logo = ttk.Combobox(self.form_frame, values=self.logos, state='readonly')
        self.combo_logo.pack(fill=tk.X, pady=(0, 10))

        ttk.Label(self.form_frame, text="Alt Text").pack(anchor=tk.W)
        self.entry_alt = ttk.Entry(self.form_frame)
        self.entry_alt.pack(fill=tk.X, pady=(0, 10))

        self.var_inkind = tk.BooleanVar()
        ttk.Checkbutton(self.form_frame, text="In-Kind Sponsor", variable=self.var_inkind).pack(anchor=tk.W, pady=(0, 10))

        ttk.Button(self.form_frame, text="Save", command=self.save_sponsor).pack(fill=tk.X, pady=10)
        
        self.current_index = None
        self.refresh_list()

    def load_data(self):
        try:
            with open(JSON_PATH, 'r', encoding='utf-8') as f:
                self.sponsors = json.load(f)
        except Exception as e:
            self.sponsors = []
            messagebox.showwarning("Warning", f"Could not load JSON: {e}\nCreating a new list.")
        
        self.logos = []
        if os.path.exists(ASSETS_DIR):
            for file in os.listdir(ASSETS_DIR):
                if file.lower().endswith(('.png', '.svg', '.jpg', '.jpeg', '.webp')):
                    self.logos.append(file)
        if not self.logos:
            self.logos = ["No logos found"]

    def save_to_file(self):
        try:
            os.makedirs(os.path.dirname(JSON_PATH), exist_ok=True)
            with open(JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(self.sponsors, f, indent=2)
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save JSON: {e}")

    def refresh_list(self):
        self.listbox.delete(0, tk.END)
        for s in self.sponsors:
            self.listbox.insert(tk.END, s.get('name', 'Unknown'))

    def on_select(self, event):
        selection = self.listbox.curselection()
        if not selection:
            return
        
        self.current_index = selection[0]
        sp = self.sponsors[self.current_index]
        
        self.entry_name.delete(0, tk.END)
        self.entry_name.insert(0, sp.get('name', ''))
        
        self.entry_url.delete(0, tk.END)
        self.entry_url.insert(0, sp.get('url', ''))
        
        self.entry_alt.delete(0, tk.END)
        self.entry_alt.insert(0, sp.get('alt', ''))
        
        self.combo_logo.set(sp.get('logo', ''))
        
        self.var_inkind.set(sp.get('inKind', False))

    def clear_form(self):
        self.current_index = None
        self.entry_name.delete(0, tk.END)
        self.entry_url.delete(0, tk.END)
        self.entry_alt.delete(0, tk.END)
        if self.logos:
            self.combo_logo.current(0)
        self.var_inkind.set(False)
        self.listbox.selection_clear(0, tk.END)

    def save_sponsor(self):
        name = self.entry_name.get().strip()
        url = self.entry_url.get().strip()
        logo = self.combo_logo.get().strip()
        alt = self.entry_alt.get().strip()
        in_kind = self.var_inkind.get()
        
        if not name or not url or not logo:
            messagebox.showwarning("Validation Error", "Name, URL, and Logo are required.")
            return

        sp = {
            "name": name,
            "url": url,
            "logo": logo,
            "alt": alt,
            "inKind": in_kind
        }

        if self.current_index is not None:
            self.sponsors[self.current_index] = sp
        else:
            self.sponsors.append(sp)
            self.current_index = len(self.sponsors) - 1
            
        self.save_to_file()
        self.refresh_list()
        self.listbox.selection_set(self.current_index)
        messagebox.showinfo("Success", "Sponsor saved!")

    def delete_sponsor(self):
        if self.current_index is None:
            messagebox.showwarning("Warning", "No sponsor selected to delete.")
            return
        
        if messagebox.askyesno("Confirm", "Are you sure you want to delete this sponsor?"):
            del self.sponsors[self.current_index]
            self.save_to_file()
            self.clear_form()
            self.refresh_list()

if __name__ == "__main__":
    app = SponsorApp()
    app.mainloop()
