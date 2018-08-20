import axios from 'axios';
//axios.defaults.withCredentials = true;
//let base='';//master
//let base='http://192.168.10.50:9090';//dev

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

let base = 'http://localhost:8080';

// 判断登录用户
export const getUser = param => {return axios.post(`${base}/test/login`,param);};

// 用户注册
export const addUser = param => {return axios.post(`${base}/test/userrigist`,param)};

// 判断用户是否已经被注册
export const checkUser = param => {return axios.post(`${base}/test/checkphone`,param)};

// 判断用户是否已经被注册
export const checkUserAlias = param => {return axios.post(`${base}/test/checkalias`,param)};

// 用户修改信息
export const updateUser = param => {return axios.post(`${base}/test/userupdate`,param)};

// 管理员登录验证
export const getAdminUser = param => {return axios.post(`${base}/test/adminlogin`,param)};

// 检验管理员是否被注册
export const checkAdminAccount = param => {return axios.post(`${base}/test/checkadminaccount`,param)};

// 查找所有的后台用户
export const findAllAdmin = param => {return axios.post(`${base}/test/findalladmin`,param);}

// 通过id查找用户
export const findAdminById = param => {return axios.post(`${base}/test/findadminbyid`,param);}

// 修改用户
export const editAdmin = param => {return axios.post(`${base}/test/editadmin`,param);}

//删除用户
export const deleteAdmin = param => {return axios.post(`${base}/test/deleteadmin`,param);}

// 添加管理员用户
export const addAdmin = param => {return axios.post(`${base}/test/addadmin`,param);};

// 根据条件查询用户
export const queryAdmin = param => {return axios.post(`${base}/test/queryadmin`,param);};

// 查询不是超级管理员的用户
export const getAllUser = () => {return axios.get(`${base}/test/getalluser`);};

// 获取影院信息
export const queryCinema = param => {return axios.post(`${base}/test/querycinema`,param);}

// 添加影院
export const AddCinema = param => {return axios.post(`${base}/test/addcinema`,param);}

// 通过id 查询影院
export const findCinemaById = param => {return axios.post(`${base}/test/findcinemabyid`,param);}

// 编辑影院
export const EditCinema = param => {return axios.post(`${base}/test/editcinema`,param);}

// 删除影院
export const DeleteCinema = param => {return axios.post(`${base}/test/deletecinema`,param);}

//获取电影信息
export const QueryMovie = param => {return axios.post(`${base}/test/querymovie`,param);}

// 添加电影
export const AddMovie = param => {return axios.post(`${base}/test/addmovie`,param);}

// 编辑电影
export const EditMovie = param => {return axios.post(`${base}/test/editmovie`,param);}
export const EditMovieStatus = () => {return axios.get(`${base}/test/EditMovieStatus`);}
// 删除电影
export const DeleteMovie = param => {return axios.post(`${base}/test/deletemovie`,param);}

// 查询电影评论
export const QueryComment = param => {return axios.post(`${base}/test/querycomment`,param);}

// 查询电影评论
export const QueryWebComment = param => {return axios.post(`${base}/test/querywebcomment`,param);}
export const QueryWebCinemaComment = param => {return axios.post(`${base}/test/querywebcinemacomment`,param);}
export const QueryCinemaComment = param => {return axios.post(`${base}/test/querycinemacomment`,param);}
// 添加影评
export const AddMovieComment = param => {return axios.post(`${base}/test/addmoviecomment`,param);}
export const AddCinemaComment = param => {return axios.post(`${base}/test/addcinemacomment`,param);}

// 查询排片日期下的影院
export const QueryPieceCinema = param => {return axios.post(`${base}/test/querypiececinema`,param);}

// 根据ids 查找电影信息
export const QueryPieceMovieByIds = param => {return axios.post(`${base}/test/querymoviebyids`,param);}

// 查找场次信息
export const QuerySession = param => {return axios.post(`${base}/test/querysession`,param);}
export const QuerySessionById = param => {return axios.post(`${base}/test/querysessionbyid`,param);}


// 查找座位信息
export const QuerySeat = param => {return axios.post(`${base}/test/queryseat`,param);}
export const EditSeat = param => {return axios.post(`${base}/test/editseat`,param);}

// 添加订单信息
export const AddOrder = param => {return axios.post(`${base}/test/insertorder`,param);}
export const QueryOrderByOrderNum = param => {return axios.post(`${base}/test/queryorderbyordernum`,param);}
export const EditOrder = param => {return axios.post(`${base}/test/editorder`,param);}
export const EditOrderPayCode = param => {return axios.post(`${base}/test/editorderpaycode`,param);}
export const EditOrderPhone = param => {return axios.post(`${base}/test/editphonebyordernum`,param);}
export const QueryOrder = param => {return axios.post(`${base}/test/queryorder`,param);}

export const QueryOrderByCondition = param => {return axios.post(`${base}/test/queryorderbycondition`,param);}
export const QueryCinemaAll = param => {return axios.post(`${base}/test/querycinemaall`,param);}
export const QueryDisplayMovie = () => {return axios.get(`${base}/test/querydisplaymovie`);}
export const QueryAllSession = param => {return axios.post(`${base}/test/queryallsession`,param);}
export const FindHotMovie = () => {return axios.get(`${base}/test/findhotmovie`);}
export const QueryRoom = param => {return axios.post(`${base}/test/queryroom`,param);}
export const FindPlayTime = param => {return axios.post(`${base}/test/findplaytimebyid`,param);}
export const AddSession = param => {return axios.post(`${base}/test/addsession`,param);}
export const CheckSession = param => {return axios.post(`${base}/test/checksession`,param);}
export const FindMaxEndTime = param => {return axios.post(`${base}/test/findmaxendtime`,param);}
export const FindMaxPieceTime = param => {return axios.post(`${base}/test/findmaxpiecetime`,param);}
export const EditSession = param => {return axios.post(`${base}/test/editsession`,param);}
export const DeleteSession = param => {return axios.post(`${base}/test/deletesession`,param);}
export const CheckSessionTime = param => {return axios.post(`${base}/test/checksessiontime`,param);}
export const CheckSessionTimeOne = param => {return axios.post(`${base}/test/checksessiontimeone`,param);}

// 想看表 
export const QueryWanted = param => {return axios.post(`${base}/test/queryWanted`,param);}
export const AddWanted = param => {return axios.post(`${base}/test/addwanted`,param);}
export const EditWanted = param => {return axios.post(`${base}/test/editwanted`,param);}

// 票房信息
export const QueryAllTicket = param => {return axios.post(`${base}/test/queryallticket`,param);}
export const EditAllTicket = param => {return axios.post(`${base}/test/editallticket`);}
export const QueryTicket = param => {return axios.post(`${base}/test/queryticket`,param);}

export const QueryLibMovie = param => {return axios.post(`${base}/test/querylibmovie`,param);}
export const QueryRelatedMovie = param => {return axios.post(`${base}/test/queryrelatedmovie`,param);}
export const FindMovieById = param => {return axios.post(`${base}/test/findmoviebyId`,param);}


// 钱包操作
export const AddWallet = param => {return axios.post(`${base}/test/addwallet`,param);}
export const QueryWallet = param => {return axios.post(`${base}/test/querywallet`,param);}
export const EditWallet = param => {return axios.post(`${base}/test/editwallet`,param);}
export const EditWallet1 = param => {return axios.post(`${base}/test/editwallet1`,param);}
export const EditWallet2 = param => {return axios.post(`${base}/test/editwallet2`,param);}

// 发送信息
export const SendTicketNum = param => {return axios.post(`${base}/test/sendticketnum`,param);}
export const SendCancelOrder = param => {return axios.post(`${base}/test/sendcancelorder`,param);}

