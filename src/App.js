import "./App.css";
import React, { useState, useEffect } from "react";
import {
	Routes,
	Route,
	useLocation,
	Link,
	useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadMembersAxios, loadDetailAxios } from "./redux/moduels/socialing";
import { loadUserInfoAxios } from "./redux/moduels/user";

import Main from "./components/Main";
import Register from "./components/Register";
import RegisterStep1 from "./components/RegisterStep1";
import RegisterStep2 from "./components/RegisterStep2";
import RegisterStep3 from "./components/RegisterStep3";
import Login from "./components/Login";
import Detail from "./components/Detail";
import JoinSocialing from './components/JoinSocialing';
import JoinQuestion from './components/JoinQuestion';
import Manage from './components/Manage';

// 소셜링 등록하기 페이지 컴포넌트
import CreateSocialing from "./components/CreateSocialing";
import CreateStep1 from "./components/CreateStep1";
import CreateStep2 from "./components/CreateStep2";
import CreateStep3 from "./components/CreateStep3";
import CreateStep4 from "./components/CreateStep4";
import CreateStep5 from "./components/CreateStep5";
import CreateStep6 from "./components/CreateStep6";
import CreateStep7 from "./components/CreateStep7";
import CreateStep8 from "./components/CreateStep8";
import SearchAddress from "./components/SearchAddress";
import Completed from "./components/Completed";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [step, setStep] = useState(1);
	const [address, setAddress] = useState("");
	const [popupIsVisible, setPopupIsVisible] = useState(false);
	const [pathname, setPathname] = useState(location.pathname);
	const membersState = useSelector((state) => state.socialing.members);
	const editState = useSelector((state) => state.socialing.view);
	const [editId, setEditId] = useState();

	const [data, setData] = useState({
		id: "",
		password: "",
		nickname: "",
	});
	useEffect(()=>{
		
		const checkPermission = async()=>{
			const token = await sessionStorage.getItem('token');
			const validTo = await sessionStorage.getItem('validTo');
			const now = Date.now();
			if(!token){
				navigate('/login');
			}else{
				dispatch(loadUserInfoAxios());
			}
		}
		checkPermission();
	},[])
	useEffect(() => {
		setPathname(location.pathname);
		if(location.pathname.split('/')[1] === 'edit'){
			const id = location.pathname.split('/')[2];
			dispatch(loadMembersAxios(id));
			dispatch(loadDetailAxios(id));
			setEditId(id);
		}
	}, [location.pathname]);
	useEffect(()=>{
		if(location.pathname.split('/')[1] === 'edit'){
			const id = location.pathname.split('/')[2];
			dispatch(loadDetailAxios(id));
		}
	}, [editId])
	
	return (
		<div
			className="App"
			style={{
				width: "100%",
				maxWidth: "500px",
				minHeight: "100vh",
				margin: "0 auto",
				overflowX: "hidden",
			}}
		>
			{
				pathname === "/" || pathname === "/login" ? (
					<header>
						<div className="set_inner">
							<H1>
								<Link to="/">MUNTO</Link>
							</H1>
						</div>
					</header>
				) : (
					<header style={{ position: "relative" }} className={pathname.split("/")[1] === 'view' ? 'longer' : ''}>
						{((pathname.split("/")[1] !== "view" && pathname.split('/')[1] !== 'join' && pathname.split("/")[1] !== "completed" && pathname.split("/")[1] !== "manage" && pathname.split("/")[1] !== "question")) && (
							<div style={{ height: "4px", backgroundColor: "#F4F4F4" }}>
								<span
									style={{
										width: `${
											(step / ((pathname.split("/")[1] === "create" || pathname.split("/")[1] === "edit") ? 8 : 3)) * 100
										}%`,
										height: "100%",
										display: "block",
										backgroundColor: "#E1483C",
										transition: "ease .4s",
									}}
								></span>
							</div>
						)}

						<ButtonGoBack
							type="button"
							onClick={() => {
								if(pathname.split("/")[1] === "view") navigate('/');
								else navigate(-1);
								
							}}
						></ButtonGoBack>
					</header>
				)
			}

			<div className="container">
				{/* 최대 가로 사이즈 500 고정, 가운데 정렬하는 style */}
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/view/:id" element={<Detail />} />
					<Route path="/join/:id" element={<JoinSocialing />}></Route>
					<Route path="/question/:id" element={<JoinQuestion />}></Route>
					<Route path="/completed" element={<Completed />}></Route>
					<Route path="/manage/:status/:id" element={<Manage />}></Route>

					{/* start: 회원가입하기 components */}
					<Route path="/register" element={<Register />}>
						<Route
							path="step_1"
							element={<RegisterStep1 setStep={setStep} />}
						></Route>
						<Route
							path="step_2"
							element={<RegisterStep2 setStep={setStep} />}
						></Route>
						<Route
							path="step_3"
							element={<RegisterStep3 setStep={setStep} />}
						></Route>
					</Route>
					{/* end: 회원가입하기 components */}

					{/* start: 소셜링 등록하기 components */}
					<Route path="/create" element={<CreateSocialing />}>
						<Route
							path="step_1"
							element={<CreateStep1 setStep={setStep} setData={setData} />}
						></Route>
						<Route
							path="step_2"
							element={<CreateStep2 setStep={setStep} setData={setData} />}
						></Route>
						<Route
							path="step_3"
							element={<CreateStep3 setStep={setStep} setData={setData} />}
						></Route>
						<Route
							path="step_4"
							element={
								<CreateStep4
									setStep={setStep}
									setData={setData}
									address={address}
									setAddress={setAddress}
									popupIsVisible={popupIsVisible}
									setPopupIsVisible={setPopupIsVisible}
								/>
							}
						></Route>
						<Route
							path="step_5"
							element={<CreateStep5 setStep={setStep} setData={setData} />}
						></Route>
						<Route
							path="step_6"
							element={<CreateStep6 setStep={setStep} setData={setData} />}
						></Route>
						<Route
							path="step_7"
							element={<CreateStep7 setStep={setStep} setData={setData} />}
						></Route>
						<Route
							path="step_8"
							element={<CreateStep8 setStep={setStep} setData={setData} />}
						></Route>
					</Route>
					{/* end: 소셜링 등록하기 components */}

					{/* start: 소셜링 수정하기 components */}
					<Route path="/edit/:id" element={<CreateSocialing page="edit"/>}>
						<Route
							path="step_1"
							element={<CreateStep1 setStep={setStep} setData={setData} page="edit" members={membersState?.members} editState={editState}/>}
						></Route>
						<Route
							path="step_2"
							element={<CreateStep2 setStep={setStep} setData={setData} page="edit" members={membersState?.members} editState={editState}/>}
						></Route>
						<Route
							path="step_3"
							element={<CreateStep3 setStep={setStep} setData={setData} page="edit" members={membersState?.members} editState={editState}/>}
						></Route>
						<Route
							path="step_4"
							element={
								<CreateStep4
									setStep={setStep}
									setData={setData}
									address={address}
									setAddress={setAddress}
									popupIsVisible={popupIsVisible}
									setPopupIsVisible={setPopupIsVisible}
									page="edit" members={membersState?.members}
									editState={editState}
								/>
							}
						></Route>
						<Route
							path="step_5"
							element={<CreateStep5 setStep={setStep} setData={setData} page="edit" members={membersState?.members} editState={editState}/>}
						></Route>
						<Route
							path="step_6"
							element={<CreateStep6 setStep={setStep} setData={setData} page="edit" members={membersState?.members} editState={editState}/>}
						></Route>
						<Route
							path="step_7"
							element={<CreateStep7 setStep={setStep} setData={setData} page="edit" members={membersState?.members} editState={editState}/>}
						></Route>
						<Route
							path="step_8"
							element={<CreateStep8 setStep={setStep} setData={setData} page="edit" members={membersState?.members} editState={editState}/>}
						></Route>
					</Route>
					{/* end: 소셜링 수정하기 components */}
				</Routes>
			</div>
			{popupIsVisible && (location.pathname === "/create/step_4" || pathname.split('/')[1] === 'edit') && (
				<div
					style={{
						position: "fixed",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						maxHeight: "100vh",
					}}
				>
					<SearchAddress
						setAddress={setAddress}
						popupIsVisible={popupIsVisible}
						setPopupIsVisible={setPopupIsVisible}
					/>
				</div>
			)}
		</div>
	);
}

const H1 = styled.h1`
	font-size: 30px;
	color: #e1483c;
	letter-spacing: 0.05em;
	line-height: 50px;
`;
const ButtonGoBack = styled.div`
	display: block;
	position: relative;
	width: 40px;
	height: 40px;
	&:before {
		position: absolute;
		left: 16px;
		top: 50%;
		margin: -7px 0 0;
		width: 12px;
		height: 12px;
		border-left: 2px solid #222;
		border-bottom: 2px solid #222;
		transform: rotate(45deg);
		content: "";
	}
`;

export default App;
