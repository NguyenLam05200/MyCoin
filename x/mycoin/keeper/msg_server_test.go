package keeper_test

import (
	"context"
	"testing"

	keepertest "MyCoin/testutil/keeper"
	"MyCoin/x/mycoin/keeper"
	"MyCoin/x/mycoin/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.MycoinKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
