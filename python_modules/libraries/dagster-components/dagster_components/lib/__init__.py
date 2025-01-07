import importlib.util

_has_dagster_dbt = importlib.util.find_spec("dagster_dbt") is not None
_has_dagster_embedded_elt = importlib.util.find_spec("dagster_embedded_elt") is not None

if _has_dagster_dbt:
    from dagster_components.lib.dbt_project.component import (
        DbtProjectComponent as DbtProjectComponent,
    )

if _has_dagster_embedded_elt:
    from dagster_components.lib.sling_replication_collection import (
        SlingReplicationCollectionComponent as SlingReplicationCollectionComponent,
    )

from dagster_components.lib.definitions_component.component import (
    DefinitionsComponent as DefinitionsComponent,
)
from dagster_components.lib.pipes_subprocess_script_collection import (
    PipesSubprocessScriptCollection as PipesSubprocessScriptCollection,
)
