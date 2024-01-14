/** 
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
    async redirects() {
        // /api/*のリクエストをDockerコンテナで起動しているAPIサーバーにプロキシする
        // host.docker.internalはDockerコンテナからホストのローカルネットワークにアクセスするための特殊なホスト名
        return [
            {
                permanent: true,
                source: '/api/:path*',
                destination: 'http://host.docker.internal:8000/api/:path*/',
            },
        ]
    },
}

module.exports = nextConfig
