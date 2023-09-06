// Assest
import logoWarning from "../assets/warningDeleteIcon.png";

export default function ModalDelete({
  openModal,
  closeModal,
  isActivity,
  data,
  handleDelete,
}) {
  return (
    <div>
      {openModal ? (
        <div
          data-cy="activity-item-delete-button"
          onClick={closeModal}
          className="flex justify-center bg-gray-500 bg-opacity-75 items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-auto my-6 mx-auto max-w-3xl"
          >
            <div
              data-cy="modal-delete"
              className="border-0 p-4 gap-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              <div className="flex justify-center p-10">
                <img src={logoWarning} className="w-10 h-10" alt="" />
              </div>
              <h1>
                Apakah anda yakin menghapus{" "}
                {isActivity ? "activity" : "List Item"}{" "}
                <span className="font-bold">“{data.title}”</span>?
              </h1>
              <div className="flex gap-5 justify-center">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 rounded-full px-5 py-2"
                  data-cy="modal-delete-cancel-button"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 rounded-full px-5 py-2"
                  data-cy="activity-item-delete-button"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
