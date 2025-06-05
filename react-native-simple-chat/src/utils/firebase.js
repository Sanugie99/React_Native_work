import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import config from '../../firebase.json'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//getStorage : firebase와 연결된 Storage객체를 불러온다
//ref : Storage에 있는 파일이나 경로를 참조하는 객체
//uploadBytes : Storage에 파일을 업로드해주는 함수
//getDownloadURL : Storage에 업로드된 파일의 다운로드 URL을 가져온다.
//updateProfile : 로그인한 유저의 프로필 업데이트를 하는 함수.

const app = initializeApp(config);

//getAuth
//현재 프로젝트에 대한 인증 서비스 객체를 만든다.
//이 객체를 통해 인증과 관련된 모든 작업(로그인, 회원가입, 로그아웃 등)을 하게된다.
const auth = getAuth(app);

export const login = async ({ email, password }) => {
  //signInWithEmailAndPassword()
  //이메일과 비밀번호로 로그인을 시도하는 함수
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  // userCredential 객체 안에는 로그인된 사용자 정보가 들어 있음
  return user;
};

export const signup = async ({ email, password, name, photoURL }) => {
  //이메일/비밀번호를 기반으로 firebase의 auth에 사용자 등록
  //createUserWithEmailAndPassword함수는 이메일과 비밀번호만 인자로 받는데
  //어떻게 이름과 사진을 같이 저장할 수 있을까?
  //사용자 이름은 문자열로 입력할 수 있지만, 사진을 선택해서 받은 경로는 'file://...'로 시작하는
  //값을 가지고 있어 바로 사용할 수 없다.
  //사용자에 의해 선택한 사진을 firebase의 스토리지에 업로드해서 해결할 수 있다.
  const { user } = await createUserWithEmailAndPassword(auth, email, password);


  //프로필 사진 URL 처리
  //https로 시작하면 그대로 사용, 아니면 Storage에 업로드 후 URL을 획득해서 사용
  const photoUrl = await uploadImage(photoURL);

  //현재 로그인한 유저의 이름과 프로필 사진을 업데이트 합니다.
  await updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl });

  return user;
}


//이미지를 업로드하는 함수
const uploadImage = async uri => {
  //이미 https로 시작하는 경우 바로 반환을 해라
  if (uri.startsWith('https')) {
    return uri;
  }
  //로컬 파일을 fetch해서 blob데이터로 변환
  const response = await fetch(uri);
  //blob() : binaryLargeObject의 약자
  const blob = await response.blob();

  //현재 로그인한 유저의 uid를 가져온다.
  const { uid } = auth.currentUser;

  //Storage 인스턴스를 생성
  const storage = getStorage(app);
  //Storage에 저장할 파일 경로를 설정
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);

  //파일을 Storage에 업로드, 타입은 image/png로 명시
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  })

  return await getDownloadURL(storageRef);
}
