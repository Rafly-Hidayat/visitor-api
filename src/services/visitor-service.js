import { createCanvas, loadImage } from 'canvas';
import qr from 'qrcode';
import prisma from "../database.js";
import { ResponseError } from "../err/err-response.js";
import { validation } from "../validation/validation.js";
import { createVisitorValidation, outVisitorValidation } from "../validation/visitor-schema.js";

const create = async (request) => {
    const data = validation(createVisitorValidation, request)

    const findPurpose = await prisma.purpose.findFirst({
        where: { purpose: data.purpose }
    })

    if (!findPurpose) {
        throw new ResponseError(404, "Purpose not found")
    }

    data.purposeId = findPurpose.purposeId;
    delete data.purpose

    const addVisitor = await prisma.visitor.create({
        data
    })

    const text = addVisitor.dateIn;

    const qrCode = await qr.toDataURL(addVisitor.visitorId, { errorCorrectionLevel: 'H' });

    // Load QR code image onto canvas
    const canvas = createCanvas(310, 310);
    const ctx = canvas.getContext('2d');
    const qrImage = await loadImage(qrCode);
    ctx.drawImage(qrImage, 0, 0, 310, 310);

    // Add additional text at the bottom
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(text, 150, 300);

    // Convert canvas to base64
    return {
        ...addVisitor,
        qrcode: canvas.toDataURL()
    }
}

const out = async (request) => {
    const data = validation(outVisitorValidation, request)

    const visitor = await prisma.visitor.findUnique({
        where: { visitorId: data.visitorId, dateOut: null },
    })

    if (!visitor) {
        throw new ResponseError(404, "visitor not found")
    }

    return prisma.visitor.update({
        data,
        where: { visitorId: visitor.visitorId },
    })
}

const getALl = async () => {
    return prisma.visitor.findMany()
}

const getIdCard = async (visitorId) => {
    const visitor = await prisma.visitor.findUnique({
        where: { visitorId },
    })

    if (!visitor) {
        throw new ResponseError(404, "visitor not found")
    }

    return visitor.idCard
}

export default { create, out, getALl, getIdCard }
