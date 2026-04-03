<?php

namespace App\Filament\Resources\Menus\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class MenuForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Product Details')
                ->description('Manage product information and pricing.')
                ->schema([
                   TextInput::make('name')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
                        
                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),

                        Select::make('category_id')
                            ->relationship(name: 'category', titleAttribute: 'name')
                            ->searchable()
                            ->preload()
                            ->required(),

                        TextInput::make('preparation_time')
                            ->numeric()
                            ->suffix('mins') // Added a suffix for clarity
                            ->default(null),
                    // Full width description
                    Textarea::make('description')
                        ->rows(3)
                        ->columnSpanFull(),

                   TextInput::make('price')
                                ->required()
                                ->numeric()
                                ->prefix('$'),
                            
                            TextInput::make('discount_price')
                                ->numeric()
                                ->prefix('$'),
                ]),

            Section::make('Media & Status')
                ->schema([
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->imageEditor() // Allows users to crop
                        ->columnSpanFull(),

                    Grid::make(2) // 3 items side-by-side on desktop
                        ->schema([
                            Toggle::make('is_available')
                                ->inline(false) // Better look inside grids
                                ->required(),
                            Toggle::make('is_featured')
                                ->inline(false)
                                ->required(),
                           
                        ]),

                         TextInput::make('rating')
                                ->required()
                                ->numeric()
                                ->default(0),
                ])
                ->columns(1), // Stack internal grid items                
            ]);
    }
}
