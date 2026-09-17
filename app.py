# app.py
# Main entry point for the Malenadu Tiffin website.
# Flask reads this file first when you run the application.

from flask import Flask, render_template

# Create the Flask application instance.
# __name__ tells Flask where to look for templates and static files.
app = Flask(__name__)


# --- Routes ---
# A "route" maps a URL to a Python function.
# When someone visits "/", Flask calls the index() function.

@app.route("/")
def index():
    """Render the homepage."""
    return render_template("index.html")


@app.route("/menu")
def menu():
    """Render the full menu page."""
    return render_template("menu.html")


# --- Run the development server ---
# This block only runs when you execute: python app.py
# debug=True means Flask will auto-reload when you save changes.

if __name__ == "__main__":
    app.run(debug=True)
