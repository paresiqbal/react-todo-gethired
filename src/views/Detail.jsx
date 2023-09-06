// React
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Layout
import Layout from "../layout/Layout";

// Icons
import { httpServices } from "../services/httpServices";
import { BsPlusLg, BsPencil, BsTrash } from "react-icons/bs";
import { BiChevronLeft } from "react-icons/bi";
import { GoAlert } from "react-icons/go";
import { RiArrowUpDownFill } from "react-icons/ri";
import { HiOutlineSortAscending } from "react-icons/hi";

// Componnsts
import AddTodo from "../components/AddTodo";
import Delete from "../components/Delete";
import emptyLogo from "../assets/todo-empty-state.png";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [dataTodos, setDataTodos] = useState([]);
  const [detailTodo, setDetailTodo] = useState({});
  const [detail, setDetail] = useState({});
  const [editTitle, setEditTitle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState(false);

  const loadDataDetail = async () => {
    await httpServices.detailActivity(id).then((res) => {
      // console.log(res);
      setData(res.data);
      setDataTodos(res.data.todo_items);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadDataDetail();
  }, []);

  const handleDeleteTodos = () => {
    httpServices.deleteTodo(detail.id).then((res) => {
      setShowModalDelete(false);
      console.log(res);
      loadDataDetail();
    });
  };

  const handleCheckboxTodo = (e, id) => {
    console.log(e.target.checked, id);
    httpServices
      .updateTodo(id, {
        is_active: 0 ? 0 : 1,
      })
      .then((res) => {
        console.log(res.data);
        loadDataDetail();
      });
  };

  const handleUpdateTodo = (item) => {
    setShowModalEdit(true);
    setDetailTodo(item);
  };

  const changeTitle = (e) => {
    if (e.key === "Enter") {
      console.log("Woke", e.target.value);
      httpServices.updateActivity(id, { title: e.target.value }).then((res) => {
        console.log(res);
        loadDataDetail();
        setEditTitle(false);
      });
    }
  };

  const handleBlur = (e) => {
    setEditTitle(false);
    console.log(e.target.value);
    httpServices.updateActivity(id, { title: e.target.value }).then((res) => {
      console.log(res);
      loadDataDetail();
      setEditTitle(false);
    });
  };

  const handleNewTodo = () => {
    setShowModal(true);
    loadDataDetail();
  };

  const sortByAscending = () => {
    const clone = [...dataTodos];

    const dataSorted = clone.sort((a, b) => (a.title > b.title ? 1 : -1));
    setDataTodos(dataSorted);
    setFilterOptions(!filterOptions);
  };

  const sortByDescending = () => {
    const clone = [...dataTodos];

    const dataSorted = clone.sort((a, b) => (a.title < b.title ? 1 : -1));
    setDataTodos(dataSorted);
  };

  const sortByNewest = () => {
    const clone = [...dataTodos];

    const dataSorted = clone.sort((a, b) => (a.id < b.id ? 1 : -1));
    setDataTodos(dataSorted);
  };

  const sortByOldest = () => {
    const clone = [...dataTodos];

    const dataSorted = clone.sort((a, b) => (a.id > b.id ? 1 : -1));
    setDataTodos(dataSorted);
  };

  const sortByActive = () => {
    const clone = [...dataTodos];

    const dataSorted = clone.sort((a, b) =>
      a.is_active > b.is_active ? 1 : -1
    );
    setDataTodos(dataSorted);
  };
  console.log(dataTodos);

  return (
    <Layout>
      <div>
        <header className="flex items-center justify-between">
          <div
            className="flex items-center justify-start gap-5"
            data-cy="todo-title"
          >
            <BiChevronLeft
              onClick={() => navigate("/")}
              className="text-4xl cursor-pointer"
            />
            {editTitle === false ? (
              <h1 className="font-bold text-4xl">{data.title}</h1>
            ) : (
              <input
                type="text"
                onKeyDown={changeTitle}
                onBlur={handleBlur}
                autoFocus={true}
                defaultValue={data.title}
                className="font-bold p-2 text-4xl bg-transparent focus:outline-none focus:border-b-2 focus:border-black"
              />
            )}
            <BsPencil
              onClick={() => setEditTitle(true)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilterOptions(!filterOptions)}
              className="rounded-full p-3 border border-gray-600 text-gray-600 text-2xl"
            >
              <RiArrowUpDownFill />
            </button>
            {filterOptions ? (
              <div className="absolute right-36 top-48 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                <div className="p-2">
                  <button
                    onClick={sortByNewest}
                    className="flex cursor-pointer px-4 py-2 text-md items-center gap-2 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  >
                    <HiOutlineSortAscending />
                    <h1>Terbaru</h1>
                  </button>
                  <button
                    onClick={sortByOldest}
                    className="flex cursor-pointer px-4 py-2 text-md items-center gap-2 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  >
                    <HiOutlineSortAscending />
                    <h1>Terlama</h1>
                  </button>
                  <button
                    onClick={sortByAscending}
                    className="flex cursor-pointer px-4 py-2 text-md items-center gap-2 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  >
                    <HiOutlineSortAscending />
                    <h1>A-Z</h1>
                  </button>
                  <button
                    onClick={sortByDescending}
                    className="flex cursor-pointer px-4 py-2 text-md items-center gap-2 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  >
                    <HiOutlineSortAscending />
                    <h1>Z-A</h1>
                  </button>
                  <button
                    onClick={sortByActive}
                    className="flex cursor-pointer px-4 py-2 text-md items-center gap-2 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  >
                    <HiOutlineSortAscending />
                    <h1>Belum Selesai</h1>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              data-cy="todo-add-button"
              onClick={handleNewTodo}
              className="flex items-center gap-2 bg-blue-400 py-3 px-4 rounded-full text-white font-bold text-xl"
            >
              <BsPlusLg />
              <h1>Tambah</h1>
            </button>
          </div>
        </header>

        {loading ? (
          <div className="pt-10 flex justify-center">
            <svg
              className="animate-spin -inline-block w-20 h-20 border-4 rounded-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            {dataTodos.length >= 1 ? (
              <div className="pt-10">
                {dataTodos.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white px-5 py-4 my-5 rounded-xl shadow-2xl"
                  >
                    <div className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        defaultChecked={item.is_active === 0}
                        onClick={(e) => handleCheckboxTodo(e, item.id)}
                      />
                      <GoAlert
                        className={
                          item.priority === "very-high"
                            ? "text-[#ED4C5C]"
                            : item.priority === "high"
                            ? "text-[#F8A541]"
                            : item.priority === "normal"
                            ? "text-[#00A790]"
                            : item.priority === "low"
                            ? "text-[#428BC1]"
                            : item.priority === "very-low"
                            ? "text-[#8942C1]"
                            : ""
                        }
                      />
                      <h1 className="text-2xl">{item.title}</h1>
                      <button className="text-sm">
                        <BsPencil onClick={() => handleUpdateTodo(item)} />
                      </button>
                    </div>
                    <BsTrash
                      className="cursor-pointer"
                      onClick={() => {
                        setShowModalDelete(true);
                        setDetail(item);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <img src={emptyLogo} alt="" />
              </div>
            )}
          </>
        )}
      </div>
      <AddTodo
        openModal={showModal}
        data={data}
        closeModal={() => {
          setShowModal(false);
          loadDataDetail();
        }}
      />
      <AddTodo
        openModal={showModalEdit}
        isEdit={true}
        data={detailTodo}
        closeModal={() => {
          setShowModalEdit(false);
          loadDataDetail();
        }}
      />
      <Delete
        openModal={showModalDelete}
        data={detail}
        closeModal={() => setShowModalDelete(true)}
        handleDelete={handleDeleteTodos}
      />
    </Layout>
  );
}
