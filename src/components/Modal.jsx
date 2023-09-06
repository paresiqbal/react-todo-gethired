export default function Modal({ openModal, children }) {
  return (
    <div>
      {openModal ? (
        <div className="flex justify-center bg-gray-500 bg-opacity-75 items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {children}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
