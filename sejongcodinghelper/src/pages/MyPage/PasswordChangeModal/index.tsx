import React, { useCallback, useState } from 'react';
import { Content, Title, Input, Button, ErrorMsg, InfoMsg } from './style';
import {
  getHeaderRefreshTokenConfing,
  logoutProc,
} from '../../../api/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import Modal from '../../../components/Modal';
import { changePassword } from '../../../api/User/User';

function PasswordChangeModal({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) {
  const [pwError, setPwError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const dispatch = useDispatch();
  // 사용자 정보
  const user = useSelector((state: RootState) => state.user);

  const onChangeNewPassword = useCallback((e: any) => {
    setNewPassword(e.target.value);
  }, []);
  const onChangeOldPassword = useCallback((e: any) => {
    setOldPassword(e.target.value);
  }, []);
  const onChangeReNewPassword = useCallback((e: any) => {
    setReNewPassword(e.target.value);
  }, []);

  const changePasswordProc = useCallback(
    (params: {
      bojHandle: string;
      oldPassword: string;
      newPassword: string;
    }) => {
      const config = getHeaderRefreshTokenConfing();
      changePassword(params, config)
        .then((response) => {
          // 비밀번호 변경 성공 시 로그아웃 처리한다.
          if (response.status === 200) {
            alert('비밀번호를 변경하였습니다. 다시 로그인해주세요.');
            // 로그아웃 처리
            logoutProc(dispatch);
            return;
          }
        })
        .catch((e) => {
          if (e.response.data.message === 'Not matches Password') {
            setPwError(true);
            setErrorMsg('기존 비밀번호가 틀립니다.');
            return;
          }
        });
    },
    [dispatch]
  );

  const onClickChangeButton = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!user.bojHandle) return;
      if (!newPassword.trim() || !oldPassword.trim() || !reNewPassword.trim()) {
        setPwError(true);
        setErrorMsg('비밀번호를 입력해주세요.');
        return;
      }
      if (newPassword === oldPassword) {
        setPwError(true);
        setErrorMsg('새로운 비밀번호는 기존 비밀번호와 달라야합니다.');
        return;
      }
      if (newPassword !== reNewPassword) {
        setPwError(true);
        setErrorMsg('새로운 비밀번호가 다릅니다.');
        return;
      }
      // 비밀번호 유효성 검사
      const regExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,20}$/g;
      if (!regExp.test(newPassword)) {
        setPwError(true);
        setErrorMsg('규칙에 맞는 비밀번호를 설정해주세요.');
        return;
      }
      setPwError(false);
      const params = {
        bojHandle: user.bojHandle,
        oldPassword,
        newPassword,
      };
      changePasswordProc(params);
    },
    [
      user.bojHandle,
      newPassword,
      oldPassword,
      reNewPassword,
      changePasswordProc,
    ]
  );
  const onCloseModal = useCallback(() => {
    closeModal();
    setNewPassword('');
    setReNewPassword('');
    setOldPassword('');
    setPwError(false);
    setErrorMsg('');
  }, [closeModal]);

  return (
    <Modal show={showModal} onCloseModal={onCloseModal}>
      <Content>
        <Title>비밀번호 변경하기</Title>
        <InfoMsg>
          영문자와 특수문자, 숫자를 포함해서 9-20자로 설정해주세요.
        </InfoMsg>
        <form onSubmit={onClickChangeButton}>
          <Input
            onChange={onChangeOldPassword}
            value={oldPassword}
            type="password"
            placeholder="기존 비밀번호를 입력해주세요."
          />
          <Input
            onChange={onChangeNewPassword}
            value={newPassword}
            placeholder="새로운 비밀번호를 입력해주세요."
            type="password"
          />
          <Input
            onChange={onChangeReNewPassword}
            value={reNewPassword}
            placeholder="새로운 비밀번호를 한번 더 입력해주세요."
            type="password"
          />
          {pwError && <ErrorMsg>{errorMsg}</ErrorMsg>}
          <Button>변경하기</Button>
        </form>
      </Content>
    </Modal>
  );
}

export default PasswordChangeModal;
