import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Gifprograms } from '../target/types/gifprograms';

describe('gifprograms', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Gifprograms as Program<Gifprograms>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
