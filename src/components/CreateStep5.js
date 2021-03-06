import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import ic_detail_order from "../images/ic_detail_order.png";
import ic_detail_order_active from "../images/ic_detail_order_active.png";
import ic_detail_approval from "../images/ic_detail_approval.png";
import ic_detail_approval_active from "../images/ic_detail_approval_active.png";
import TextInput from "./TextInput";

const CreateStep5 = ({ setStep, setData, page, editState }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const param = useParams().id;
	const [recruitment, setRecruitment] = useState([]);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [textValue, setTextValue] = useState();
	const nextButton = useRef();
	useEffect(() => {
		setStep(5);
	}, []);

	useEffect(() => {
		setBtnDisabled(true);
		if (recruitment === "early bird") {
			setBtnDisabled(false);
		} else if (recruitment === "approved" && textValue?.trim().length >= 10) {
			setBtnDisabled(false);
		}
	}, [textValue, recruitment]);

	useEffect(() => {
		if(page === 'edit'){
			if(sessionStorage.getItem('recruitmentType')){
				setRecruitment(sessionStorage.getItem('recruitmentType'))
			}else{
				setRecruitment(editState?.recruitmentType)
			}
			if(sessionStorage.getItem('question')){
				setTextValue(sessionStorage.getItem('question'))
			}else{
				setTextValue(editState?.question)
			}
		}
	}, [editState?.recruitmentType]);
	return (
		<>
			<h3 className="section_title" style={{ padding: "20px 0 28px" }}>
				어떻게 멤버를 모집할까요?
			</h3>
			<div className="input_area">
				<RadioBox className="input_box">
					<label className={recruitment === "early bird" ? "is_active" : ""}>
						<input
							type="radio"
							name="recruitmentType"
							value="early bird"
							onChange={(e) => setRecruitment(e.target.value)}
						/>
						<span
							style={{
								backgroundImage: `url(${
									recruitment === "early bird"
										? ic_detail_order_active
										: ic_detail_order
								})`,
							}}
						></span>
						<dl>
							<dt>선착순</dt>
							<dd>
								멤버들의 신청과 동시에 참여가 완료돼요. <br />
								누구나 참여할 수 있어서 신쳥률이 높아요.
							</dd>
						</dl>
					</label>
				</RadioBox>
				<RadioBox className="input_box">
					<label className={recruitment === "approved" ? "is_active" : ""}>
						<input
							type="radio"
							name="recruitmentType"
							value="approved"
							onChange={(e) => setRecruitment(e.target.value)}
						/>
						<span
							style={{
								backgroundImage: `url(${
									recruitment === "approved"
										? ic_detail_approval_active
										: ic_detail_approval
								})`,
							}}
						></span>
						<dl>
							<dt>승인제</dt>
							<dd>
								호스트가 멤버를 수락하거나 거절할 수 있어요. <br />
								질문을 작성하고 멤버들의 답변을 통해
								<br />
								취향이 통하는 사람들과 만날 수 있어요.
							</dd>
						</dl>
					</label>
				</RadioBox>
			</div>
			{recruitment === "approved" && (
				<div>
					<p
						style={{
							fontSize: "16px",
							fontWeight: "500",
							lineHeight: "1.3",
							margin: "30px 0 15px",
						}}
					>
						멤버들의 소셜링 신청을 위한 질문을 작성해주세요.
					</p>
					<div className="input_area">
						<InputArea>
							<input
								type="text"
								placeholder="예시) 어떤 관심사를 갖고 계신가요?"
								maxLength="80"
								style={{ fontSize: "15px", color: "#222" }}
								onInput={(e) => setTextValue(e.target.value)}
								value={textValue}
							/>
						</InputArea>
						<div
							style={{
								fontSize: "11px",
								color: "#B8B6B6",
								marginTop: "3px",
								textAlign: "right",
								letterSpacing: "0.03em",
							}}
						>
							<span style={{ color: "#222" }}>
								{textValue?.length > 0 ? textValue.length : 0}
							</span>
							/ 80
						</div>
					</div>
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
					ref={nextButton}
					disabled={btnDisabled}
					onClick={() => {
						sessionStorage.setItem("recruitmentType", recruitment);
						sessionStorage.setItem("question", textValue);
						navigate(
							page !== "edit" ? "/create/step_6" : `/edit/${param}/step_6`
						);
						setStep(6);
					}}
				>
					다음
				</Button>
			</div>
		</>
	);
};

const InputArea = styled.div`
	&.type_box {
		input {
			border: 1px solid #d9d9d9;
			border-radius: 6px;
			overflow: hidden;
			border-bottom-color: #d9d9d9;
			height: 44px;
			box-sizing: border-box;
			padding: 0 14px;
			&:focus {
				border-bottom: 1px solid #d9d9d9;
			}
		}
	}
`;
const RadioBox = styled.div`
	font-size: 15px;
	label {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 14px;
		align-items: center;
		padding: 18px;
		border: 1px solid #d9d9d9;
		border-radius: 6px;
		box-sizing: border-box;
		&.is_active {
			border-color: #e1483c;
			background-color: #e1483c;
			dt,
			dd {
				color: #fff;
			}
		}
		input {
			flex: none;
		}
		span {
			display: inline-block;
			width: 20px;
			height: 20px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: 20px;
		}
		dt {
			margin-bottom: 4px;
			font-weight: 500;
		}
		dd {
			color: #989696;
			line-height: 1.5;
		}
	}
	& + .input_box {
		margin-top: 12px;
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
export default CreateStep5;
