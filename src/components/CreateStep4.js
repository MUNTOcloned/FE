import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import ic_location from "../images/ic_location.png";

const CreateStep4 = ({
	setStep,
	address,
	setAddress,
	popupIsVisible,
	setPopupIsVisible,
	setData,
	page,
	members,
	editState
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const param = useParams().id;
	useEffect(() => {
		setStep(4);

	}, []);
	const radioRef = useRef(null);
	const meetingTypeRadio = ["offline", "online"];
	const [meetingType, setMeetingType] = useState(null);
	const [activateButton, setActivateButton] = useState(false);
	useEffect(() => {
		setActivateButton(false);
		if (meetingTypeRadio[meetingType] === "online") {
			setActivateButton(true);
			setAddress("");
		} else if (meetingTypeRadio[meetingType] === "offline" && address !== "") {
			setActivateButton(true);
		}
	}, [meetingType, address]);

	useEffect(() => {
		if(page === 'edit'){
			if(sessionStorage.getItem('meetingType')){
				setMeetingType(sessionStorage.getItem('title') === 'offline' ? 0 : 1)
			}else{
				setMeetingType(editState?.meetingType === 'offline' ? 0 : 1)
			}
			if(sessionStorage.getItem('address')){
				setAddress(sessionStorage.getItem('address'))
			}else{
				setAddress(editState?.address)
			}
		}
	}, [editState?.meetingType]);
	

	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				어디서 만날까요?
			</h3>
			<div className="input_area">
				<ul style={{ display: "flex", gap: "8px" }}>
					{meetingTypeRadio.map((v, i) => {
						return (
							<li
								key={i}
								style={{
									flexBasis: "50%",
								}}
							>
								<label
									style={{
										display: "block",
										height: "50px",
										lineHeight: "46px",
										border: `1px solid ${
											meetingType === i ? "#E1483C" : "#DBDBDB"
										}`,
										backgroundColor: `${
											meetingType === i ? "#E1483C" : "transparent"
										}`,
										color: `${meetingType === i ? "#fff" : "#222"}`,
										borderRadius: "6px",
										textAlign: "center",
										boxSizing: 'border-box',
									}}
								>
									<input
										type="radio"
										name="meetingType"
										value={v}
										checked={meetingType === i}
										onChange={() => setMeetingType(i)}
									/>
									{v === "offline" ? "오프라인" : "온라인"}
								</label>
							</li>
						);
					})}
				</ul>
			</div>
			{meetingTypeRadio[meetingType] === "offline" && (
				<div className="address_area" style={{ marginTop: "10px" }}>
					<p
						onClick={() => setPopupIsVisible(true)}
						style={{
							background: `url(${ic_location}) left center / 28px 45px no-repeat`,
							height: "45px",
							lineHeight: "44px",
							borderBottom: "1px solid #d9d9d9",
							paddingLeft: "28px",
							color: address !== "" ? "#222" : "#989696",
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
							overflow: 'hidden'
						}}
					>
						{address ? address : "장소를 입력해주세요."}
					</p>
				</div>
			)}
			<div
				style={{
					position: "fixed",
					left: 0,
					right: 0,
					bottom: 0,
					padding: "0 12px 40px",
					background:
						"linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)",
				}}
			>
				<Button
					type="button"
					disabled={activateButton ? false : true}
					onClick={() => {
						if(page === 'edit'){
								sessionStorage.setItem('meetingType', meetingTypeRadio[meetingType])
								sessionStorage.setItem('address', address)
								navigate(`/edit/${param}/step_5`);
								setStep(5);
						}else{
							sessionStorage.setItem('meetingType', meetingTypeRadio[meetingType])
							sessionStorage.setItem('address', address)
							navigate("/create/step_5");
							setStep(5);
						}
					}}
				>
					다음
				</Button>
			</div>
		</>
	);
};

const ImageFile = styled.label`
	display: block;
	width: 100%;
	input[type="file"] + div {
		height: 82px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f4f4f4;
		border: 1px solid #dbdbdb;
		border-radius: 6px;
		box-sizing: border-box;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		&.has_image {
			img,
			p {
				display: none;
			}
		}
	}
`;
const Button = styled.button`
	display: block;
	width: 100%;
	height: 46px;
	line-height: 46px;
	border-radius: 20px;
	background-color: #e1483c;
	color: #fff;
	font-size: 15px;
	text-align: center;
	font-weight: 500;
	:disabled {
		background-color: #d9d9d9;
		color: #989696;
	}
`;
export default CreateStep4;
