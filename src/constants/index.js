import AdminHomePage from "../containers/AdminHomePage";
import TaskBoard from "../containers/Taskboard";
import LoginPage from "../containers/LoginPage";
import SignupPage from "../containers/SignupPage";
export const API_ENDPOINT = "http://localhost:3000";
export const STATUSES = [
	{
		value: 0,
		label: "READY",
	},
	{
		value: 1,
		label: "IN PROGRESS",
	},
	{
		value: 2,
		label: "COMPLETED",
	},
];
export const STATUS_CODE = {
	SUCCESS: 200,
	CREATED: 201,
	UPDATED: 202,
};

export const ADMIN_ROUTES = [
	{
		path: "/admin",
		name: "Trang quản trị",
		exact: true,
		component: AdminHomePage,
	},
	{
		path: "/admin/task-board",
		name: "Quản lí công việc",
		component: TaskBoard,
	},
];

export const ROUTES = [
	{
		name: "Đăng nhập",
		path: "/login",
		exact: true,
		component: LoginPage,
	},
	{
		name: "Đăng Kí",
		path: "/signup",
		component: SignupPage,
	},
];

export const ROUTES_ERROR = [];
