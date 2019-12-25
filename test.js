const QiniuManage = require('./src/utils/QiniuManager')
const path = require('path')

const accessKey = 'Y_VjJvfGRD8RXqojceJsu86083azIdQDrPdqJOMn';
const secretKey = 'MhzBBjHm_pvy3hhdq2UUfTIeo35BS-Geet-QRuBZ';
var localFile = "C:/Users/MoJue/Documents/文档1.md";

var key = '文档1.md';


// var bucketManager = new qiniu.rs.BucketManager(mac, config);
var publicBucketDomain = 'http://q2jmhgeyj.bkt.clouddn.com';
// 公开空间访问链接
// var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
// console.log(publicDownloadUrl);
const manager = new QiniuManage(accessKey, secretKey, 'clouddoc-jaymo')
// manager.uploadFile(key, localFile).then((data) => {
//     console.log('上传成功'+data)
//     return manager.deleteFile(key)
// }).then((data)=> {
//     console.log('删除成功')
// }).catch((err) => {
//     console.error(err)
// })
// manager.getBucketDomain().then((data) => {
//     console.log(data)
// })
// manager.generateDownloadLink(key).then(data => {
//     console.log(data)
// })
const downloadPath = path.join(__dirname, key)
manager.downloadFile(key, downloadPath).catch(err=> {
    console.log(err)
})
// manager.deleteFile(key)