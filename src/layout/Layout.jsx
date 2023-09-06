export default function DrawerLayout({ children }) {
  return (
    <div className="">
      <nav className="bg-[#16ABF8] px-44 py-10">
        <h1 data-cy="header-title" className="text-white font-bold text-3xl">
          TO DO LIST APP
        </h1>
      </nav>
      <div className="bg-[#E5E5E5] min-h-screen px-44 pt-10">{children}</div>
    </div>
  );
}
