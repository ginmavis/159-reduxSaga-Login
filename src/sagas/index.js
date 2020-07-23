import {
	fork,
	take,
	call,
	put,
	delay,
	takeLatest,
	takeEvery,
	select,
} from "redux-saga/effects";
import * as taskTypes from "./../constants/task";
import { getList, addTask, updateTask, deleteTask } from "./../apis/task";
import { STATUS_CODE, STATUSES } from "./../constants";
import {
	fetchListTaskFailed,
	fetchListTaskSuccess,
	addTaskSuccess,
	fetchListTask,
	updateTaskSuccess,
	updateTaskFailed,
	deleteTaskSuccess,
	deleteTaskFailed,
	addTaskFailed,
} from "../actions/task";
import { showLoading, hideLoading } from "../actions/ui";
import { hideModal } from "../actions/modal";

//  B1 :  thực thi (dispatch) action fetch task
// B2 : Gọi api
// B2.1 Hiển thị thanh tiến trình
// B3 : Kiểm rea status code
//  Nếu thất bại
//  Nếu thành công
//  Tắt loading
// B4 Thực thi các công việc tiếp theo
function* watchFetchListTaskAction() {
	while (true) {
		const action = yield take(taskTypes.FETCH_TASK); // sẽ lắng nghe và theo dõi action
		//  khi FETCH_TASK được dispatch => code từ đây trở xuống sẽ chạy
		yield put(showLoading());
		const { params } = action.payload;

		const resp = yield call(getList, params);
		// ==========Bock(cho đến khi call xong)===========================
		const { status, data } = resp;
		if (status === STATUS_CODE.SUCCESS) {
			// dispatch action fetchListSucess
			yield put(fetchListTaskSuccess(data));
		} else {
			// dispatch action fetchListFailed
			yield put(fetchListTaskFailed(data));
		}
		// console.log("resp : ", resp);
		yield delay(1000);
		yield put(hideLoading());
	}
}

function* filterTaskSaga({ payload }) {
	yield delay(500);
	const { keyword } = payload;
	yield put(
		fetchListTask({
			q: keyword,
		})
	);
}

function* addTaskSaga({ payload }) {
	const { title, description } = payload;
	yield put(showLoading());
	const res = yield call(addTask, {
		title,
		description,
		status: STATUSES[0].value,
	});
	const { data, status } = res;
	if (status === STATUS_CODE.CREATED) {
		yield put(addTaskSuccess(data));
		yield put(hideModal());
	} else {
		yield put(addTaskFailed(data));
	}
	yield delay(1000);
	yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
	const { title, description, status } = payload;
	// lấy dữ liệu trong store
	const taskEditing = yield select((state) => state.task.taskEditing);
	yield put(showLoading());
	const res = yield call(
		updateTask,
		{
			title,
			description,
			status,
		},
		taskEditing.id
	);

	const { data, status: statusCode } = res;
	if (statusCode === STATUS_CODE.SUCCESS) {
		yield put(updateTaskSuccess(data));
		yield put(hideModal());
	} else {
		yield put(updateTaskFailed(data));
	}
	yield delay(1000);
	yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
	const { id } = payload;
	// lấy dữ liệu trong store
	yield put(showLoading());
	const res = yield call(deleteTask, id);
	// data trả về không có dữ liệu nên phải trả về id để xử lý
	const { data, status: statusCode } = res;
	if (statusCode === STATUS_CODE.SUCCESS) {
		yield put(deleteTaskSuccess(id));
		yield put(hideModal());
	} else {
		yield put(deleteTaskFailed(data));
	}
	yield delay(1000);
	yield put(hideLoading());
}
function* rootSaga() {
	yield fork(watchFetchListTaskAction);

	yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
	yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
	yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
	yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}
export default rootSaga;
