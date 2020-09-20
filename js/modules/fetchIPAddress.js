export default async function fetchIPAddress(IPAddress) {

    try {
        const apiKey = 'at_tDW8LxsWf3pxouhI2uVFy7g7qkERv'
        const IPData = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${IPAddress}`);
        const IPDataJson= await IPData.json();

        return IPDataJson;
    } catch (error) {
        alert("Sorry, we couldn't find that address.")
    }



}