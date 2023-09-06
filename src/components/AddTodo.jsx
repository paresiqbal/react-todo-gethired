// React
import { useState } from "react";
import Select from "react-select";

// Icons
import { AiOutlineClose } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { httpServices } from "../services/httpServices";

export default function AddTodo({ openModal, closeModal, data, isEdit }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState("");

  const options = [
    {
      value: "very-high",
      label: (
        <div className="flex gap-3">
          <GoPrimitiveDot className="text-2xl text-[#ED4C5C]" /> Very High
        </div>
      ),
    },
    {
      value: "high",
      label: (
        <div className="flex gap-3">
          <GoPrimitiveDot className="text-2xl text-[#F8A541]" /> High
        </div>
      ),
    },
    {
      value: "normal",
      label: (
        <div className="flex gap-3">
          <GoPrimitiveDot className="text-2xl text-[#00A790]" /> Medium
        </div>
      ),
    },
    {
      value: "low",
      label: (
        <div className="flex gap-3">
          <GoPrimitiveDot className="text-2xl text-[#428BC1]" /> Low
        </div>
      ),
    },
    {
      value: "very-low",
      label: (
        <div className="flex gap-3">
          <GoPrimitiveDot className="text-2xl text-[#8942C1]" /> Very Low
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    console.log(data);
    const formData = {
      priority: selectedOption.value,
      activity_group_id: data.id,
      title: title,
      is_active: true,
      created_at: new Date(),
    };
    console.log(formData);
    httpServices.addNewTodo(formData).then((res) => {
      console.log(res);
      closeModal();
    });
  };

  const handleEdit = () => {
    const formData = {
      title: title,
      priority: selectedOption.value,
      updated_at: new Date(),
    };
    httpServices.updateTodo(data.id, formData).then((res) => {
      console.log(res);
      closeModal();
    });
  };
  return (
    <>
      {openModal ? (
        <div className="flex justify-center bg-gray-500 bg-opacity-75 items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
              <div className="flex items-center text-2xl font-bold justify-between p-2">
                <h1>Tambah List Item</h1>
                <AiOutlineClose onClick={closeModal} />
              </div>
              <hr className="border" />
              <div className="p-2 flex flex-col gap-5">
                <div>
                  <h1>NAMA LIST ITEM</h1>
                  <input
                    defaultValue={isEdit ? data.title : ""}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Tambahkan nama list item"
                  />
                </div>
                <div>
                  <h1>PRIORITY</h1>
                  <Select
                    className="w-48"
                    value={selectedOption}
                    options={options}
                    onChange={setSelectedOption}
                  />
                </div>
              </div>
              <hr className="border-2" />
              <div className="flex justify-end p-2">
                <button onClick={isEdit ? handleEdit : handleAdd}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
