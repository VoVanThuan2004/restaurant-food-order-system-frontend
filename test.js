// console.log(name);
// test();

// var name = "Thuan";
// let a = "Test";

// function test() {
//   console.log("Hello");
// }

// console.log(a);

const getUserById = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Lấy thông tin user theo id");
    }, 5000);
  })
}

const getProfile = async () => {
  console.log("1. Bắt đầu vào hàm");

  const result = await getUserById();

  console.log("2. Kết quả:", result);
  console.log("3. Thông tin userId đã được fetch");
}

const test = () => {
  console.log("Test");
}

getProfile();
test();
console.log("Làm việc bên ngoài");