<?php

namespace App\Filament\Resources\ViewedItems\Pages;

use App\Filament\Resources\ViewedItems\ViewedItemResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListViewedItems extends ListRecords
{
    protected static string $resource = ViewedItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
