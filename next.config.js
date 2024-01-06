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
                source: '/api/:slug*',
                destination: 'http://host.docker.internal:8000/api/:slug*',
            },
        ]
    },
}

module.exports = nextConfig
