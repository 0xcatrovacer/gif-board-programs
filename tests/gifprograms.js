const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

const main = async () => {
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Gifprograms;

    const baseAccount = anchor.web3.Keypair.generate();

    let tx = await program.rpc.initialize({
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
    });

    console.log("Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
    );

    await program.rpc.addGif("insert_gif_link", {
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
        },
    });

    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("GIF Count", account.totalGifs.toString());
    console.log("GIF List", account.gifList);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();
