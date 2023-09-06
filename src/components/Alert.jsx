// Icons
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function Alert({ openAlert, closeAlert }) {
  return (
    <div>
      {openAlert ? (
        <div
          onClick={closeAlert}
          className="flex justify-center bg-gray-500 bg-opacity-75 items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-auto my-6 mx-auto max-w-3xl"
          >
            <div
              className="border-0 p-4 gap-3 rounded-lg shadow-lg relative flex w-96 bg-white outline-none focus:outline-none"
              data-cy="modal-information"
            >
              <div className="text-[#00A790] text-2xl">
                <AiOutlineInfoCircle />
              </div>
              <h1>Activity berhasil dihapus</h1>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
