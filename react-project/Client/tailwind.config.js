// tailwind.config.js
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // 让 Tailwind 扫描这些文件
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {

        },
    },
    plugins: [],
};
