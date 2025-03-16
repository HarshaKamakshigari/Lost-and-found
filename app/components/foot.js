export default function Footer() {
    return (
      <footer className="bg-white text-gray-600 py-6 shadow-md border-t border-gray-200 fixed bottom-0 w-full">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Lost & Found. All rights reserved.</p>
          <p className="text-sm mt-2">Built with ❤️ by Team 0</p>
        </div>
      </footer>
    );
  }
  