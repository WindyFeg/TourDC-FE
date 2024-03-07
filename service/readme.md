# API document for read/write data from blockchain

# How to run

## import {functions} from web3.js file

## functions is the below:

### getBalanceOf(user_address)
- Trả về DC token của người dùng
- **Input:**
  *user_address*: địa chỉ của người dùng (string)
- **output**: bigint?
  *example:*
```bash
  await getBalanceOf("0x76E046c0811edDA17E57dB5D2C088DB0F30DcC74")
  1000000n
```

### getTouristInfor(user_address)
- Trả về thông tin của người dùng
- **Input:**
  *user_address*: địa chỉ của người dùng (string)
- output: Object 
  **example:**
```bash
await getTouristInfor(account1)
  {
  '0': 'Nguyễn',
  '1': 'Duy',
  '2': '0918844446',
  '3': 15n,
  '4': 100n,
  __length__: 5,
  firstName: 'Nguyễn',
  lastName: 'Duy',
  phoneNumber: '0918844446',
  REP: 15n,
  VP: 100n
  }
```

### getTouristReviews(user_address)
- Trả về tất cả bài reviews của một người đung
- **output**: Array objects
  *example:* 
```bash
await getTouristReviews("0x1a620c351c07763f430897AeaA2883E37cA0aaCD")
  [
  {
    '0': '0x1a620c351c07763f430897AeaA2883E37cA0aaCD',
    '1': '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35',
    '2': '1',
    '3': 'Đà Lạt',
    '4': 1709781384n,
    '5': 0n,
    '6': 'My 2024 trips',
    '7': 50n,
    '8': 'Da Lat Beauty',
    '9': 0n,
    __length__: 10,
    author: '0x1a620c351c07763f430897AeaA2883E37cA0aaCD',
    postID: '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35',
    placeId: '1',
    placeName: 'Đà Lạt',
    arrivalDate: 1709781384n,
    createTime: 0n,
    review: 'My 2024 trips',
    rate: 50n,
    title: 'Da Lat Beauty',
    upvoteNum: 0n
    }
  ]
```

### getDestinationReviews(place_id)
- Trả về tất cả reviews của một địa danh
- **input:**
  *place_id:* id của địa danh ==> lấy từ database qua
- **output:** Array objects
  *Example:*

```bash
await getDestinationReviews("1")
[
  {
    '0': '0x1a620c351c07763f430897AeaA2883E37cA0aaCD',
    '1': '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35',
    '2': '1',
    '3': 'Đà Lạt',
    '4': 1709781384n,
    '5': 0n,
    '6': 'My 2024 trips',
    '7': 50n,
    '8': 'Da Lat Beauty',
    '9': 0n,
    __length__: 10,
    author: '0x1a620c351c07763f430897AeaA2883E37cA0aaCD',
    postID: '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35',
    placeId: '1',
    placeName: 'Đà Lạt',
    arrivalDate: 1709781384n,
    createTime: 0n,
    review: 'My 2024 trips',
    rate: 50n,
    title: 'Da Lat Beauty',
    upvoteNum: 0n
  }
]
```
### getDestinationRates(place_id)
- Trả về tất cả số rates từ một địa danh
- **input:**
  *place_id:* id của địa danh ==> lấy từ database qua
- **output:** Array BigInt
  *example*

```bash
await getDestinationRates("1")

[ 50n ]
```

### getVotesOfReview(post_id)
- Trả về tất cả các votes của một bài review
- **input:**
  *post_id:* Id của bài review ==> lấy từ database qua???
- **output**: array objects
  *example:*
```bash
await getVotesOfReview("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35")
[
  {
    '0': '0x2936E9fACfF3fb5DDc08d13DB19659ec093cdE69',
    '1': 15n,
    '2': 100n,
    __length__: 3,
    curator: '0x2936E9fACfF3fb5DDc08d13DB19659ec093cdE69',
    curatorREP: 15n,
    curatorVP: 100n
  },
  {
    '0': '0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f',
    '1': 15n,
    '2': 100n,
    __length__: 3,
    curator: '0x9E0E58F9052aDc53986eA9ca7cf8389b0EdE364f',
    curatorREP: 15n,
    curatorVP: 100n
  }
]
```

### calculationTotalReward(post_id)
- trả về tổng reward point của một bài review
- **input:**
  *post_id:* Id của bài review ==> lấy từ database qua???
- **output**: big int number
  *example:*
```bash
await calculationTotalReward("0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35")
45n
```

### rewardListOfTourist(user_address)
- Trả về danh sách post id mà du khách có thể nhận được thưởng khi upvote hoặc rate(chưa bấm nhận thương)
- **Input:**
  *user_address*: địa chỉ của người dùng (string)
- **output:** Array String
  *example*
```bash
await rewardListOfTourist(account2)
[
  '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35'
]
``` 

### touristRewardPointOnPostID(user_address, post_id)
- trả về số điểm thưởng của một du khách cho một bài review khi upvote hoặc đăng bài
- **Input:**
  *user_address*: địa chỉ của người dùng (string)
  *post_id:* Id của bài review ==> lấy từ database qua???
- **Output:**
  *example*: big int number
```bash
  console.log("Get reward number of an post by user: ", await touristRewardPointOnPostID(account1, '0x26eecb00ddef76d58362552f4fd2e782ae49d1e064ccd5b06bd70dcd8039ec35'))
  Get reward number of an post by user:  33750000000000000000n
```

