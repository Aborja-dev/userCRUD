import  { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const main = async () => {
 await fillRoleTable()
 await fillUserTable()   
}

const fillRoleTable = async () => {
    await prisma.role.createMany({
        data: [
            {
                role: 'ADMIN'
            },
            {
                role: 'USER'
            }
        ]
    })
}

const fillUserTable = async () => {
    await prisma.user.createMany({
        data: [
            {
                email: 'admin@example.com',
                name: 'Abraham',
                password: '1234asdf',
                active: 'ACTIVE',
                roleId: 1,
                phone: '123456789',
            },
            {
                email: 'client@example.com',
                name: 'Abraham 2',
                password: '1234asdf',
                active: 'ACTIVE',
                roleId: 2,
                phone: '123456789',
            },
            {
                email: 'client2@example.com',
                name: 'Abraham 3',
                password: '1234asdf',
                active: 'ACTIVE',
                roleId: 2,
                phone: '123456789',
            },
            {
                email: 'client3@example.com',
                name: 'Abraham 4',
                password: '1234asdf',
                active: 'ACTIVE',
                roleId: 2,
                phone: '123456789',
            },
            {
                email: 'client4@example.com',
                name: 'Abraham 5',
                password: '1234asdf',
                active: 'ACTIVE',
                roleId: 2,
                phone: '123456789',
            }
        ]
    })
}


main().then(() => {
    prisma.$disconnect()
}).catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
})
