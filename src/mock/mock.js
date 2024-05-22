import Mock from 'mockjs'

//登录数据
Mock.mock('/getLogin',
  {
    "error_code": 0,
    "data": [{
      "id": '1',
      "usertitle": "管理员",
      "username": "admin",
      "password": "123456",
      "token": Mock.Random.guid(),
     },
     {
      "id": '2',
      "usertitle": "用户",
      "username": "root",
      "password": "123456",
      "token": Mock.Random.guid(),
     }
    ]
  }
)

