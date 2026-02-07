import React, { FC, useCallback } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LibraryViewSettings } from 'types/library';

interface FiltersVideoResolutionsProps {
    videoResolutionsOptions: string[];
    libraryViewSettings: LibraryViewSettings;
    setLibraryViewSettings: React.Dispatch<React.SetStateAction<LibraryViewSettings>>;
}

const FiltersVideoResolutions: FC<FiltersVideoResolutionsProps> = ({
    videoResolutionsOptions,
    libraryViewSettings,
    setLibraryViewSettings
}) => {
    const onFiltersVideoResolutionsChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const value = event.target.value;
            const existingResolutions = libraryViewSettings?.Filters?.VideoResolutions ?? [];

            const updatedResolutions = existingResolutions.includes(value) ?
                existingResolutions.filter((filter) => filter !== value) :
                [...existingResolutions, value];

            setLibraryViewSettings((prevState) => ({
                ...prevState,
                StartIndex: 0,
                Filters: {
                    ...prevState.Filters,
                    VideoResolutions: updatedResolutions.length ? updatedResolutions : undefined
                }
            }));
        },
        [setLibraryViewSettings, libraryViewSettings?.Filters?.VideoResolutions]
    );

    return (
        <FormGroup>
            {videoResolutionsOptions.map((filter) => (
                <FormControlLabel
                    key={filter}
                    control={
                        <Checkbox
                            checked={
                                !!libraryViewSettings?.Filters?.VideoResolutions?.includes(
                                    filter
                                )
                            }
                            onChange={onFiltersVideoResolutionsChange}
                            value={filter}
                        />
                    }
                    label={filter}
                />
            ))}
        </FormGroup>
    );
};

export default FiltersVideoResolutions;
