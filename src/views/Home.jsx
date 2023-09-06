import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { BsPlusLg, BsTrash } from "react-icons/bs";
import { httpServices } from "../services/httpServices";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import Delete from "../components/Delete";
import Alert from "../components/Alert";
import emptyActivityList from "../assets/activity-empty-state.png";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadActivityList();
  }, []);

  const loadActivityList = () => {
    httpServices.getActivityList().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setLoading(false);
        setData(res.data.data);
      }
    });
  };

  const handleNewActivity = () => {
    const data = {
      email: "rhesadav48@gmail.com",
      title: "New Activityss",
      created_at: new Date(),
    };
    console.log(data);
    setLoading(true);
    httpServices.addNewActivity(data).then(() => {
      setTimeout(() => {
        loadActivityList();
      }, 100);
    });
  };

  const handleDelete = () => {
    console.log(detail);
    httpServices.deleteActivity(detail.id).then((res) => {
      console.log("resdelete", res);
      loadActivityList();
      if (res.status === 200) {
        setShowModal(false);
        setShowAlert(true);
        loadActivityList();
      }
    });
  };

  return (
    <Layout>
      <header
        data-cy="activity-title"
        className="flex items-center justify-between"
      >
        <h1 className="font-bold text-4xl">Activity</h1>
        <button
          data-cy="activity-add-button"
          onClick={handleNewActivity}
          className="flex items-center gap-2 bg-blue-400 py-3 px-4 rounded-full text-white font-bold text-xl"
        >
          <BsPlusLg />
          <h1>Tambah</h1>
        </button>
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
          {data.length >= 1 ? (
            <div className="grid pt-10 grid-cols-4 gap-5">
              {data.map((item, index) => (
                <div
                  key={index}
                  data-cy="activity-item"
                  className="bg-white p-4 h-48 flex flex-col justify-between cursor-pointer rounded-xl shadow-2xl"
                  onClick={() => navigate(`/detail/${item.id}`)}
                >
                  <h1
                    data-cy="activity-item-title"
                    className="font-semibold cursor-pointer text-xl"
                  >
                    {item.title}
                  </h1>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-between items-center text-gray-500"
                  >
                    <h1 data-cy="activity-item-date" className="tracking-wide">
                      {moment(item.created_at).format("DD MMM YYYY")}
                    </h1>
                    <button
                      className="text-2xl"
                      // onClick={() => setShowModal(!showModal)}
                      onClick={() => {
                        setShowModal(true);
                        setDetail(item);
                      }}
                    >
                      <BsTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center flex-col pt-10">
              <img src={emptyActivityList} className="" alt="" />
            </div>
          )}
        </>
      )}

      <Delete
        openModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
        handleDelete={handleDelete}
        isActivity={true}
        data={detail}
      />
      <Alert openAlert={showAlert} closeAlert={() => setShowAlert(false)} />
    </Layout>
  );
}
