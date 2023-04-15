package keeper

import (
	"MyCoin/x/mycoin/types"
)

var _ types.QueryServer = Keeper{}
