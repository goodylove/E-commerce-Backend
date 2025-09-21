import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../errors/customerErrors";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { handleEmailService } from "../config/email";
import { VERIFICATION_EMAIL_TEMPLATE } from "../config/emailTemplate";

const prisma = new PrismaClient();

export async function getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            Order: {
                include: {
                    items: {
                        include: { product: true },
                    },
                    Payment: true,
                    address: true,
                },
            },
            CartItem: {
                include: {
                    product: true,
                },
            },
            Address: true,
            Review: true

        },
    });
    if (!user) {
        throw new BadRequestError("Not user found");
    }
    return user;
}

export async function getAllUsers() {
    const users = await prisma.user.findMany();

    if (!users) {
        throw new BadRequestError("No users found");
    }
    return users;
}
export async function updateUserService(body: any, userId: string) {
    const emailExist = await prisma.user.findUnique({
        where: { email: body.email },
    });

    if (emailExist) {
        throw new BadRequestError("Email already exist");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new BadRequestError("No User Found");
    }

    const updateData: any = {};

    if (body.name) {
        updateData.name = body.name;
    }

    if (body.email) {
        const token = generateToken();

        updateData.pendingEmail = body.email;
        updateData.verificationToken = token;

        // await handleEmailService({
        //     to: body.email,
        //     subject: "Verification Token",
        //     message: `${VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token)}`,
        // });
    }
    if (body.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        updateData.password = hash;
    }

    const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
            role: true,
        },
    });
    console.log(updateUser);
    return updateUser;
}


export async function deleteUserService(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    if (!user) {
        throw new BadRequestError('No User found')
    }

    // await prisma.token.delete({ where: { id: user.id } });
    // await prisma.order.delete({ where: { id: user.id }, });
    // await prisma.review.delete({ where: { id: user.id } });
    // await prisma.cartItem.delete({ where: { id: user.id } });
    // await prisma.address.delete({ where: { id: user.id } });



    // const deletedUser = await prisma.user.delete({
    //     where: { id: user.id },
    // })

    await prisma.$transaction([
        prisma.token.deleteMany({ where: { userId } }),
        prisma.order.deleteMany({ where: { userId } }),
        prisma.review.deleteMany({ where: { userId } }),
        prisma.cartItem.deleteMany({ where: { userId } }),
        prisma.address.deleteMany({ where: { userId } }),
    ]);

    const deletedUser = await prisma.user.delete({ where: { id: userId } })
    return deletedUser
}
export async function getSingleUserServices(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })


    if (!user) {
        throw new BadRequestError(`No user found with this id ${userId}`)
    }
    return user
}