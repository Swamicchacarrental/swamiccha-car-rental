const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

export async function callAppsScript(action, payload = {}) {
if (!API_URL) {
throw new Error(
"Google Apps Script URL is missing. Check your .env.local file."
);
}

console.log("Calling Apps Script:", action);

const response = await fetch(API_URL, {
method: "POST",
headers: {
"Content-Type": "text/plain;charset=utf-8",
},
body: JSON.stringify({
action,
...payload,
}),
});

const responseText = await response.text();

console.log("Apps Script HTTP status:", response.status);
console.log("Apps Script response:", responseText);

let result;

try {
result = JSON.parse(responseText);
} catch {
throw new Error(
"Apps Script returned an invalid response. Check the deployment URL and permissions."
);
}

if (!response.ok) {
throw new Error(
result.message || `Request failed with status ${response.status}`
);
}

return result;
}
