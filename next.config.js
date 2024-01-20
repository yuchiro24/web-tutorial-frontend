/** 
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
    async redirects() {
        // /api/*のリクエストをAPIサーバーにプロキシする
        return [
            {
                permanent: true,
                source: '/api/:path*',
                destination: 'http://localhost:8000/api/:path*/',
            },
        ]
    },
}

module.exports = nextConfig
