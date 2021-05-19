export interface MatchType {
  session_id: string;
  game: string;
  photon_app_id: string;
  count_FallenKills: number;
  count_FallenDeaths: number;
  count_GenesysKills: number;
  count_GenesysDeaths: number;
  count_SettlersKills: number;
  count_SettlersDeaths: number;
  territory_Fallen: number;
  territory_Settlers: number;
  territory_Genesys: number;
  tick: number;
  callback_count: number;
  match_id: number;
  match_started_at: string;
  scene_id: number;
  cloud_build_target_name: string;
  cloud_build_build_number: string;
  cloud_build_commit_id: string;
  active_test_name: string;
}
