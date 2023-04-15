package mycoin_test

import (
	"testing"

	keepertest "MyCoin/testutil/keeper"
	"MyCoin/testutil/nullify"
	"MyCoin/x/mycoin"
	"MyCoin/x/mycoin/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.MycoinKeeper(t)
	mycoin.InitGenesis(ctx, *k, genesisState)
	got := mycoin.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
