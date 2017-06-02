AIM: to read all files and dynamically pull the right values from the supporting files. - FAIL
AIM: to add global inclusion as a user option. - DONE - appends only
AIM: Remove trailing : or :- from all config addresse in the DB. - DONE
AIM: Remove quotes from parameter names - otherwise output yaml has triple quotes.... - Not until Richards confirms behaviour - some addresses contain single quotes.


Only APPENDS work for all features - release, global in global and global in release

Include globals
No:
Yes:As release or global config?
    Release: append or overwrite?
        Append:
        Overwrite:
    Global:
        Append:
        OverWrite:

Options:
No - Do nothing
Append to Release regardless
Overwrite at release (if match then update, if no match then add)
Append to global regardless
overwrite at global (if match then update, if no match then add)