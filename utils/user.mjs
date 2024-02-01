export const getUser = async () => {
    const startArgs = process.argv.slice(2);
    return startArgs.find(arg => arg.startsWith('--username=')).split('=')[1];
};
