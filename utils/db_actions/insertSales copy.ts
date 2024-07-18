// export function insertFromExcel() {
//     for (let i = 22; i < sales.length; i++) {
//         const sale = sales[i]
//         const client = { firstName: sale.firstName, lastName: sale.lastName, idNum: sale.idNum }
//         const agnt = { firstName: sale.agnt }

//         delete sale.firstName // remove firstName
//         delete sale.lastName // remove lastName
//         delete sale.idNum // remove idNum
//         delete sale.agnt // remove agnt

//         const res = await db.sale.create({
//           data: {
//             ...sale,
//             offrDt: sale.offrDt ? new Date(sale.offrDt) : new Date(Date.now()),
//             saleDt: sale.saleDt ? new Date(sale.saleDt) : new Date(Date.now()),
//             client: {
//               connectOrCreate: {
//                 where: {
//                   idNum: client.idNum,
//                 },
//                 create: {
//                   firstName: client.firstName,
//                   lastName: client.lastName,
//                   idNum: client.idNum,
//                 },
//               },
//             },

//             agnt: {
//               connectOrCreate: {
//                 where: {
//                   id: 1,
//                 },
//                 create: {
//                   firstName: agnt.firstName,
//                 },
//               },
//             },
//           },
//         })

//         console.log(res)
//       }

// }
