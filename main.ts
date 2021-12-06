
/* eslint-disable prettier/prettier */
export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events
  const mod= RegisterMod("Whole Leaf", 1);

  // Register callbacks
  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
  mod.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache);

  // Print an initialization message to the "log.txt" file
  Isaac.DebugString("Mod initialized.");

  const itemID = {
    WholeLeaf: Isaac.GetItemIdByName("Whole Leaf"),
  }

  // eslint-disable-next-line prefer-const
  let hasItem = {
    WholeLeaf: false,
  }

  function updateItems(player: EntityPlayer) {
      hasItem.WholeLeaf = player.HasCollectible(itemID.WholeLeaf);

  };

  function postUpdate() {
    updateItems(Isaac.GetPlayer(0));
  }

  function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag) {
    if (cacheFlag === CacheFlag.CACHE_DAMAGE) {
      if (player.HasCollectible(itemID.WholeLeaf)) {
        player.Damage = player.Damage*player.MoveSpeed;    
      }
    }
    if (cacheFlag === CacheFlag.CACHE_SPEED) {
      if (player.HasCollectible(itemID.WholeLeaf)) {
        evaluateCache(player,CacheFlag.CACHE_DAMAGE);
      }
    }
  }
}