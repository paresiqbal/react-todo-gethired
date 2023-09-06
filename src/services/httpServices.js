import baseApi from "./baseApi";

const getActivityList = () => {
  return baseApi.get("/activity-groups?email=rhesadav48@gmail.com");
};

const addNewActivity = (data) => {
  return baseApi.post("/activity-groups", data);
};

const deleteActivity = (id) => {
  return baseApi.delete(`/activity-groups/${id}`);
};

const detailActivity = (id) => {
  return baseApi.get(`/activity-groups/${id}`);
};

const updateActivity = (id, data) => {
  return baseApi.patch(`/activity-groups/${id}`, data);
};

const getTodoList = (id) => {
  return baseApi.get(`/todo-items?activity_group_id=${id}`);
};

const addNewTodo = (data) => {
  return baseApi.post("/todo-items", data);
};

const deleteTodo = (id) => {
  return baseApi.delete(`/todo-items/${id}`);
};

const updateTodo = (id, data) => {
  return baseApi.patch(`/todo-items/${id}`, data);
};

export const httpServices = {
  getActivityList,
  addNewActivity,
  deleteActivity,
  detailActivity,
  updateActivity,
  getTodoList,
  addNewTodo,
  deleteTodo,
  updateTodo,
};
