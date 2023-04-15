package keeper_test

import (
	"testing"

	testkeeper "MyCoin/testutil/keeper"
	"MyCoin/x/mycoin/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.MycoinKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
