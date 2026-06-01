<?php

namespace App\Filament\Resources\ViewedItems\Pages;

use App\Filament\Resources\ViewedItems\ViewedItemResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewViewedItem extends ViewRecord
{
    protected static string $resource = ViewedItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
