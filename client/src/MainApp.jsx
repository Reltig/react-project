export default function MainApp() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <header className="h-10 bg-red-500">Header</header>
            <main className="mb-auto h-10 bg-green-500">Content</main>
            <footer className="h-10 bg-blue-500">Footer</footer>
        </div>
    )
}