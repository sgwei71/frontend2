import { decode } from "js-base64";

export const decodeToken = (token) => {
    if (token && token.includes(".")) {
        try {
            const payload = token.split(".")[1];
            const decodedPayload = decode(payload);
            const payloadObject = JSON.parse(decodedPayload);

            return payloadObject;
        } catch (error) {
            console.error("유효하지 않은 토큰입니다:", error);
            return token;
        }
    }
};
